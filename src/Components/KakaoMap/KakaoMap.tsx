import React, { useRef, useEffect, useState } from "react";
import { STORE_LIST_DIALOG, STORE_DETAIL_DIALOG } from "../../constants";
import { IKakaoMap, ILatLng, IMarker, ICustomOverlay } from "./types";
import styled from "../../Styles/index";
import MapActions from "../MapActions";
import useKakaoMap from "../../hooks/useKakaoMap";
import useKakaoMapBounds from "../../hooks/useKakaoMapPosition";
import useFetchStores from "../../hooks/useFetchStores";
import useKakaoMapMarker from "../../hooks/useKakaoMapMarker";
import { IStore, IVisibleRemainStat } from "../../hooks/useFetchStores";
import _ from "lodash";
import StoreListDialog from "../StoreListDialog";
import { useHistory, useLocation } from "react-router-dom";
import { useCallback } from "react";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import { isLatLngEqaul } from "../utils/maps";
import { isMobile } from "react-device-detect";
import SearchDialog from "../SearchDialog";

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
    background-color: white;
    border-radius: 8px;
    padding: 12px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    font-size: 12px;
    white-space: nowrap;
    display: flex;
    flex-direction: column;

    .rows {
      width: 100%;
      display: flex;
      justify-content: space-between;
      :not(:last-child) {
        padding-bottom: 8px;
      }
    }

    ._window_title {
      font-size: 14px;
      font-weight: 600;
      padding-bottom: 4px;
    }

    ._window_col:first-child {
      display: flex;
      flex-direction: column;
      padding-right: 12px;
      max-width: 200px;
    }

    ._window_col:nth-child(2) {
      display: flex;
      flex-direction: column;
      padding: 0;
      width: 40px;
    }

    ._row {
      width: 100%;
      white-space: normal;
      :not(:last-child) {
        padding-bottom: 4px;
      }
    }

    .linkBox {
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 4px;
      border-radius: 4px;
      border: 1px solid ${props => props.theme.blueColor} !important;

      a {
        display: block;
        width: 100%;
        text-align: center;
        text-decoration: none;
        color: ${props => props.theme.blueColor};
      }
    }

    .address {
      line-height: 1.2;
    }

    .distance {
      color: ${props => props.theme.darkGreyColor};
      padding-left: 4px;
    }

    ._stock span {
      white-space: normal;
      line-height: 1.2;
      word-break: break-all;
      :not(:last-child) {
        padding-bottom: 4px;
      }
      text-align: center;
    }

    span.plenty {
      color: ${props => props.theme.greenColor};
    }

    span.some {
      color: ${props => props.theme.yellowColor};
    }

    span.few {
      color: ${props => props.theme.redColor};
    }

    span.empty {
      color: ${props => props.theme.greyColor};
    }

    :after {
      content: "";
      position: absolute;
      margin-left: -12px;
      left: 50%;
      bottom: -10px;
      width: 22px;
      height: 12px;
      background: url("/images/vertex_white.png");
    }
  }
`;

const Map = styled.div`
  height: 100%;
`;

type Props = {
  markersVisibility: { [key in IVisibleRemainStat]: boolean };
};

export default ({ markersVisibility }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [currentMarkers, setCurrentMarkers] = useState<{ [key in IVisibleRemainStat]: IMarker[] }>({
    plenty: [],
    some: [],
    few: [],
    empty: []
  });
  const [overlays, setOverlays] = useState<ICustomOverlay[]>([]);
  const [selectedStore, setSelectedStore] = useState<IStore>();
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<ILatLng>();
  const [isCurrentLocation, setIsCurrentLocation] = useState(false);
  const [geoGranted, setGeoGranted] = useState(false);

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

  const { stores, lastFetchInfo, loading } = useFetchStores(positions);
  const { addMarker, setMarkersHidden, setMarkersVisible } = useKakaoMapMarker({
    map,
    clusterMinLevel: isMobile ? 5 : 4,
    onClick: selectStoreInMap
  });

  useEffect(() => {
    if (map) {
      getGeoLocation(
        latLng => {
          setGeoGranted(true);
          moveToLatLng(latLng);
          setCurrentLocation(latLng);
        },
        () => {
          setGeoGranted(false);
          console.log("Failed to load geolocation");
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
        markersVisibility,
        lastFetchInfo.latlng
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
      map.setLevel(isMobile ? 4 : 3);
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

  const moveToCurrentLocation = async () => {
    if (currentLocation) {
      moveToLatLng(currentLocation);
    }
    overlays.forEach(overlay => overlay.setMap(null));
  };

  const changeZoom = (direction: boolean) => {
    overlays.forEach(overlay => overlay.setMap(null));
    if (map) {
      const zoomChange = direction ? -1 : 1;
      map.setLevel(map.getLevel() + zoomChange);
    }
  };

  useEffect(() => {
    Object.keys(markersVisibility).forEach(rawKey => {
      const key = rawKey as IVisibleRemainStat;
      if (markersVisibility[key]) {
        setMarkersVisible(currentMarkers[key]);
      } else {
        setMarkersHidden(currentMarkers[key]);
        overlays.forEach(overlay => overlay.setMap(null));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markersVisibility]);

  return (
    <Container>
      <Map ref={ref} />
      <MapActions
        geoGranted={geoGranted}
        openListDialog={openListDialog}
        detailDialogOpen={detailDialogOpen}
        selectedStore={selectedStore}
        loading={loading}
        hasItem={stores.filter(store => markersVisibility[store.visible_remain_stat]).length > 0}
        moveToCurrentLocation={moveToCurrentLocation}
        isCurrentLocation={isCurrentLocation}
        changeZoom={changeZoom}
      />
      <StoreListDialog
        stores={stores.filter(store => markersVisibility[store.visible_remain_stat])}
        handleItemClick={moveToStore}
      />
      <SearchDialog handleItemClick={moveToLatLng} />
    </Container>
  );
};
