import React, { useRef, useEffect, useState } from "react";
import { STORE_LIST_DIALOG, STORE_DETAIL_DIALOG } from "../../constants";
import { IKakaoMap, ILatLng, IMarker, ICustomOverlay } from "./types";
import styled from "../../Styles/index";
import MapActions from "../MapActions";
import useKakaoMap from "../../hooks/useKakaoMap";
import useKakaoMapBounds from "../../hooks/useKakaoMapPosition";
import useFetchStores from "../../hooks/useFetchStores";
import useKakaoMapMarker from "../../hooks/useKakaoMapMarker";
import { IStore, IRemainStat } from "../../hooks/useFetchStores";
import _ from "lodash";
import StoreListDialog from "../StoreListDialog";
import { useHistory, useLocation } from "react-router-dom";
import { useCallback } from "react";
import useGeoLocation from "../../hooks/useGeoLocation";
import { isLatLngEqaul } from "../utils/maps";
import { isMobile } from "react-device-detect";

declare global {
  interface Window {
    kakao: {
      maps: IKakaoMap;
    };
  }
}

const Container = styled.div`
  height: 100%;
  div {
    border: 0 !important;
  }
  .custom_window {
    cursor: default;
    word-break: keep-all;
    line-height: 1.1;
    width: 260px;
    padding: 5px;
    display: flex;
    background-color: white;
    border-radius: 8px;
    padding: 12px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    font-size: 12px;
  }

  .custom_window .distance {
    color: ${props => props.theme.darkGreyColor};
    padding-left: 4px;
  }

  .custom_window .plenty {
    color: ${props => props.theme.greenColor};
  }

  .custom_window .some {
    color: ${props => props.theme.yellowColor};
  }

  .custom_window .few {
    color: ${props => props.theme.redColor};
  }

  .custom_window .empty {
    color: ${props => props.theme.greyColor};
  }

  .custom_window:after {
    content: "";
    position: absolute;
    margin-left: -12px;
    left: 50%;
    bottom: -10px;
    width: 22px;
    height: 12px;
    background: url("/images/vertex_white.png");
  }

  .custom_window span {
    white-space: nowrap;
  }

  .custom_window ._window_col {
    display: flex;
    flex-direction: column;
    padding-right: 12px;
  }

  .custom_window ._window_col:nth-child(2) {
    display: flex;
    flex-direction: column;
    padding: 0;
  }

  .custom_window ._window_col div {
    white-space: nowrap;
    padding-bottom: 4px;
  }

  .custom_window ._stock span {
    white-space: nowrap;
    :not(:last-child) {
      padding-bottom: 4px;
    }
    text-align: center;
  }

  .custom_window ._window_title {
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 6px;
  }
`;

const Map = styled.div`
  height: 100%;
`;

export default () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [currentMarkers, setCurrentMarkers] = useState<
    { [key in IRemainStat]: IMarker[] }
  >({
    plenty: [],
    some: [],
    few: [],
    empty: []
  });
  const [overlays, setOverlays] = useState<ICustomOverlay[]>([]);
  const [filterButtonState, setFilterButtonState] = useState<
    { [key in IRemainStat]: boolean }
  >({
    plenty: true,
    some: true,
    few: true,
    empty: true
  });

  const [selectedStore, setSelectedStore] = useState<IStore>();
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<ILatLng>();
  const [isCurrentLocation, setIsCurrentLocation] = useState(false);
  const getGeoLocation = useGeoLocation();

  const history = useHistory();
  const location = useLocation();

  const map = useKakaoMap(ref, {
    center: new window.kakao.maps.LatLng(37.566805, 126.9784147),
    level: isMobile ? 4 : 3,
    disableDoubleClick: true
  });

  const positions = useKakaoMapBounds({ map, debounce: 500 });

  const selectStoreInMap = useCallback(
    (store: IStore) => {
      setSelectedStore(store);
      history.push({
        hash: STORE_DETAIL_DIALOG
      });
    },
    [history]
  );

  const { addMarker, setMarkersHidden, setMarkersVisible } = useKakaoMapMarker({
    map,
    clusterMinLevel: isMobile ? 5 : 4,
    onClick: selectStoreInMap
  });
  const { stores, loading } = useFetchStores(positions);

  useEffect(() => {
    if (map) {
      getGeoLocation(
        latLng => {
          moveToLatLng(latLng);
          setCurrentLocation(latLng);
        },
        () => {
          alert("위치정보를 가져오는데 실패했습니다.");
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getGeoLocation, map]);

  useEffect(() => {
    let newStores: IStore[] = [];
    if (stores) {
      newStores = _.uniqBy(stores, "code");
      const { markers, overlays } = addMarker(
        currentMarkers,
        newStores,
        filterButtonState
      );
      setCurrentMarkers(markers);
      setOverlays(overlays);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stores, addMarker]);

  useEffect(() => {
    if (positions && isLatLngEqaul(currentLocation, positions.center)) {
      setIsCurrentLocation(true);
    } else {
      setIsCurrentLocation(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positions]);

  const moveToStore = (store: IStore) => {
    history.goBack();
    if (map) {
      const latlng = new window.kakao.maps.LatLng(store.lat, store.lng);
      map.setCenter(latlng);
      map.setLevel(3);
      overlays.forEach(overlay => {
        if (isLatLngEqaul(overlay.getPosition(), latlng)) {
          overlay.setMap(map);
        } else {
          overlay.setMap(null);
        }
      });
    }
  };

  const moveToLatLng = (latLng: ILatLng) => {
    if (map) {
      map.setCenter(latLng);
      map.setLevel(isMobile ? 4 : 3);
    }
  };

  useEffect(() => {
    if (location.hash === STORE_DETAIL_DIALOG && selectedStore) {
      setDetailDialogOpen(true);
    } else {
      setDetailDialogOpen(false);
    }
  }, [location.hash, selectedStore]);

  const openListDialog = () => {
    if (stores.length > 0) {
      history.push({
        hash: STORE_LIST_DIALOG
      });
    }
    overlays.forEach(overlay => overlay.setMap(null));
  };

  const moveToCurrentLocation = () => {
    if (currentLocation) {
      moveToLatLng(currentLocation);
    }
    overlays.forEach(overlay => overlay.setMap(null));
  };

  const toggleFilter = (key: IRemainStat) => {
    const current = filterButtonState[key];

    if (current) {
      setMarkersHidden(currentMarkers[key]);
    } else {
      setMarkersVisible(currentMarkers[key]);
    }

    setFilterButtonState({
      ...filterButtonState,
      [key]: !current
    });
    overlays.forEach(overlay => overlay.setMap(null));
  };

  return (
    <Container>
      <Map ref={ref} />
      <MapActions
        filterButtonState={filterButtonState}
        toggleFilter={toggleFilter}
        openListDialog={openListDialog}
        detailDialogOpen={detailDialogOpen}
        selectedStore={selectedStore}
        loading={loading}
        hasItem={
          stores.filter(store => filterButtonState[store.remain_stat]).length >
          0
        }
        moveToCurrentLocation={moveToCurrentLocation}
        isCurrentLocation={isCurrentLocation}
      />
      <StoreListDialog
        stores={stores.filter(store => filterButtonState[store.remain_stat])}
        handleItemClick={moveToStore}
      />
    </Container>
  );
};
