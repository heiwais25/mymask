import React, { useRef, useEffect, useState } from "react";
import { STORE_LIST_DIALOG, STORE_DETAIL_DIALOG } from "../../constants";
import { IKakaoMap, ILatLng } from "./types";
import styled from "../../Styles/index";
import MapActions from "../MapActions";
import useKakaoMap from "../../hooks/useKakaoMap";
import useKakaoMapBounds from "../../hooks/useKakaoMapPosition";
import useFetchStores from "../../hooks/useFetchStores";
import useKakaoMapMarker from "../../hooks/useKakaoMapMarker";
import { IStore } from "../../hooks/useFetchStores";
import _ from "lodash";
import StoreListDialog from "../StoreListDialog";
import { useHistory, useLocation } from "react-router-dom";
import { useCallback } from "react";
import useGeoLocation from "../../hooks/useGeoLocation";
import { isLatLngEqaul } from "../utils/maps";

declare global {
  interface Window {
    kakao: {
      maps: IKakaoMap;
    };
  }
}

const Container = styled.div`
  height: 100%;

  .store_marker {
    position: relative;
    display: block;
    background-color: ${props => props.theme.markerGreyColor};
    color: white;
    text-align: center;
    white-space: nowrap;
    min-width: 60px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.16), 0 2px 2px rgba(0, 0, 0, 0.23);
    padding: 8px;
    border-radius: 4px;

    .store_meta {
      display: none;
    }
  }

  .store_marker:hover {
    padding: 12px;

    .store_name {
      font-size: 14px;
    }

    .store_meta {
      padding-top: 8px;
      display: block;
    }

    :after {
      display: none;
    }
  }

  .store_marker:after {
    content: "";
    width: 0px;
    height: 0px;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 14px solid ${props => props.theme.markerGreyColor};
    position: absolute;
    margin-left: -7px;
    left: 50%;
    bottom: -14px;
  }

  .stock_plenty {
    background-color: ${props => props.theme.markerGreenColor};
  }

  .stock_plenty:after {
    background-color: ${props => props.theme.markerGreenColor};
  }

  .stock_some {
    background-color: ${props => props.theme.markerYelloColor};
  }

  .stock_some:after {
    background-color: ${props => props.theme.markerYelloColor};
  }

  .stock_empty {
    background-color: ${props => props.theme.markerRedColor};
  }

  .stock_empty:after {
    background-color: ${props => props.theme.markerRedColor};
  }

  .stock_empty {
    background-color: ${props => props.theme.markerGreyColor};
  }

  .stock_empty:after {
    background-color: ${props => props.theme.markerGreyColor};
  }
`;

const Map = styled.div`
  height: 100%;
`;

export default () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [selectedStore, setSelectedStore] = useState<IStore>();
  const [visibleStores, setVisibleStores] = useState<IStore[]>([]);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<ILatLng>();
  const [isCurrentLocation, setIsCurrentLocation] = useState(false);
  const getGeoLocation = useGeoLocation();

  const history = useHistory();
  const location = useLocation();

  const map = useKakaoMap(ref, {
    center: new window.kakao.maps.LatLng(33.45, 126.57),
    level: 3
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

  const { addMarker } = useKakaoMapMarker({
    map,
    clusterMinLevel: 4,
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
  }, [getGeoLocation, map]);

  useEffect(() => {
    let newStores: IStore[] = [];
    if (stores) {
      newStores = _.uniqBy(stores, "code");
      setVisibleStores(newStores);
      newStores.forEach(store => addMarker(store));
    }
  }, [stores, addMarker]);

  useEffect(() => {
    if (positions && isLatLngEqaul(currentLocation, positions.center)) {
      setIsCurrentLocation(true);
    } else {
      setIsCurrentLocation(false);
    }
  }, [positions]);

  const moveToStore = (store: IStore) => {
    history.goBack();
    if (map) {
      map.setCenter(new window.kakao.maps.LatLng(store.lat, store.lng));
      map.setLevel(2);
    }
  };

  const moveToLatLng = (latLng: ILatLng) => {
    if (map) {
      map.setCenter(latLng);
      map.setLevel(3);
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
  };

  const moveToCurrentLocation = () => {
    if (currentLocation) {
      moveToLatLng(currentLocation);
    }
  };

  return (
    <Container>
      <Map ref={ref} />
      <MapActions
        openListDialog={openListDialog}
        detailDialogOpen={detailDialogOpen}
        selectedStore={selectedStore}
        loading={loading}
        hasItem={visibleStores.length > 0}
        moveToCurrentLocation={moveToCurrentLocation}
        isCurrentLocation={isCurrentLocation}
      />
      <StoreListDialog stores={stores} handleItemClick={moveToStore} />
    </Container>
  );
};
