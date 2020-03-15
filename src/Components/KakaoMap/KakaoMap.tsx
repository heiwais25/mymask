import React, { useRef, useEffect, useState } from "react";
import { STORE_LIST_DIALOG, DEFAULT_ZOOM_LEVEL, CLUSTER_MIN_LEVEL } from "../../constants";
import { IKakaoMap, ILatLng } from "./types";
import styled from "../../Styles/index";
import MapActions from "../MapActions";
import useKakaoMap from "../../hooks/useKakaoMap";
import useKakaoMapBounds from "../../hooks/useKakaoMapPosition";
import useFetchStores from "../../hooks/useFetchStores";
import useKakaoMapMarker from "../../hooks/useKakaoMapMarker";
import { IStore, IVisibleRemainStat } from "../../hooks/useFetchStores";
import _ from "lodash";
import StoreListDialog from "../StoreListDialog";
import { useHistory } from "react-router-dom";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import { isLatLngEqaul } from "../utils/maps";
import SearchDialog from "../SearchDialog";
import { Container } from "./KakaoMapContainer";

declare global {
  interface Window {
    kakao: {
      maps: IKakaoMap;
    };
  }
}

const Map = styled.div`
  height: 100%;
`;

type Props = {
  markersVisibility: { [key in IVisibleRemainStat]: boolean };
};

export default ({ markersVisibility }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [currentLocation, setCurrentLocation] = useState<ILatLng>();
  const [isCurrentLocation, setIsCurrentLocation] = useState(false);
  const [geoGranted, setGeoGranted] = useState(false);

  const getGeoLocation = useGeoLocation();
  const history = useHistory();

  const { map, moveToLatLng } = useKakaoMap(ref, {
    center: new window.kakao.maps.LatLng(37.566805, 126.9784147),
    level: DEFAULT_ZOOM_LEVEL,
    disableDoubleClick: true
  });
  const positions = useKakaoMapBounds({ map, debounce: 500 });
  const { stores, lastFetchInfo, loading } = useFetchStores(positions);
  const { addMarker, openStoreOverlay, closeOverlays } = useKakaoMapMarker({
    map,
    clusterMinLevel: CLUSTER_MIN_LEVEL,
    markersVisibility
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
    if (positions && isLatLngEqaul(currentLocation, positions.center)) {
      setIsCurrentLocation(true);
    } else {
      setIsCurrentLocation(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positions]);

  useEffect(() => {
    if (stores) {
      addMarker(_.uniqBy(stores, "code"), markersVisibility, lastFetchInfo.latlng);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stores, addMarker]);

  const moveToStore = (store: IStore) => {
    history.goBack();
    if (map) {
      const latlng = new window.kakao.maps.LatLng(store.lat, store.lng);
      moveToLatLng(latlng);
      openStoreOverlay(store);
    }
  };

  const openListDialog = () => {
    if (stores.length > 0) {
      history.push({
        hash: STORE_LIST_DIALOG
      });
    }
    closeOverlays();
  };

  const moveToCurrentLocation = async () => {
    if (currentLocation) {
      moveToLatLng(currentLocation);
    }
    closeOverlays();
  };

  const changeZoom = (direction: boolean) => {
    if (map) {
      const zoomChange = direction ? -1 : 1;
      map.setLevel(map.getLevel() + zoomChange);
    }
  };

  return (
    <Container>
      <Map ref={ref} />
      <MapActions
        geoGranted={geoGranted}
        openListDialog={openListDialog}
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
