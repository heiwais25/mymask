import { useCallback, useState, useEffect } from "react";
import { IStore, IVisibleRemainStat } from "./useFetchStores";
import { IMarker, ICustomOverlay, ILatLng } from "../Components/KakaoMap/types";
import { IMap, IMarkerClusterer } from "../Components/KakaoMap/types";
import _ from "lodash";
import { getEmptyMarkerSet, getMapMarkerOverlay } from "../Components/utils/maps";
import { values, keys } from "../utils/base";
import { CLUSTER_MIN_LEVEL } from "../constants";

type Params = {
  map: IMap | undefined;
  clusterMinLevel?: number;
  markersVisibility: { [key in IVisibleRemainStat]: boolean };
  onClick?: (store: IStore) => void;
};

let markerSet = getEmptyMarkerSet();
let markerInfoByCode: {
  [key: string]: {
    marker: IMarker;
    overlay: ICustomOverlay;
  };
} = {};
let clickedMarkerCode: string;
let zIndex = 0;

export default ({
  map,
  clusterMinLevel = 7,
  markersVisibility,
  onClick = (store: IStore) => null
}: Params) => {
  const [clusterer, setClusterer] = useState<IMarkerClusterer>();

  const closeOverlays = useCallback(() => {
    markerInfoByCode[clickedMarkerCode]?.overlay.setMap(null);
    clickedMarkerCode = "";
  }, []);

  const handleZoomChange = useCallback(() => {
    if (map) {
      const currentLevel = map.getLevel();
      if (currentLevel < CLUSTER_MIN_LEVEL) {
      } else {
        closeOverlays();
      }
    }
  }, [map, closeOverlays]);

  useEffect(() => {
    if (map) {
      setClusterer(
        new window.kakao.maps.MarkerClusterer({
          map,
          averageCenter: true,
          minLevel: clusterMinLevel,
          gridSize: 80,
          minClusterSize: 1
        })
      );
      window.kakao.maps.event.addListener(map, "zoom_changed", handleZoomChange);
      window.kakao.maps.event.addListener(map, "click", closeOverlays);
    }
    return () => {
      if (map) {
        window.kakao.maps.event.removeListener(map, "zoom_changed", handleZoomChange);
        window.kakao.maps.event.removeListener(map, "click", closeOverlays);
      }
    };
  }, [map, clusterMinLevel, closeOverlays, handleZoomChange]);

  const handleMarkerClick = useCallback(
    store => () => {
      const { marker, overlay } = markerInfoByCode[store.code];
      if (map && marker && overlay) {
        const currentOpen = overlay.getMap() !== null;
        markerInfoByCode[clickedMarkerCode]?.overlay.setMap(null);
        clickedMarkerCode = "";

        marker.setZIndex(zIndex);
        zIndex += 1;
        if (!currentOpen) {
          overlay.setMap(map);
          clickedMarkerCode = store.code;
        }
        map.panTo(marker.getPosition());
      }
    },
    [map]
  );

  const addMarker = useCallback(
    (
      newStores: IStore[],
      filterState?: { [key in IVisibleRemainStat]: boolean },
      lastFetchLatLng?: ILatLng
    ) => {
      // Clear previous data
      markerInfoByCode[clickedMarkerCode]?.marker.setMap(null);
      markerInfoByCode[clickedMarkerCode]?.overlay.setMap(null);
      clusterer?.clear();
      keys(markerInfoByCode).forEach(key => delete markerInfoByCode[key]);
      markerSet = getEmptyMarkerSet();

      zIndex = 0;

      if (map) {
        newStores.forEach(store => {
          const { marker, overlay } = getMapMarkerOverlay(store);

          // Add callback
          window.kakao.maps.event.addListener(marker, "click", handleMarkerClick(store));

          // Save
          marker.setMap(map);
          if (clickedMarkerCode === store.code) {
            overlay.setMap(map);
          }

          markerSet[store.visible_remain_stat].push(marker);
          markerInfoByCode[store.code] = {
            marker,
            overlay
          };

          return marker;
        });

        clusterer?.addMarkers(_.flatten(values(markerSet)));

        // Apply filter if it is set
        if (filterState) {
          keys(filterState).forEach(key => {
            if (!filterState[key]) {
              clusterer?.removeMarkers(markerSet[key]);
            }
          });
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [map, clusterer]
  );

  useEffect(() => {
    keys(markersVisibility).forEach(key => {
      if (markersVisibility[key]) {
        clusterer?.addMarkers(markerSet[key]);
      } else {
        clusterer?.removeMarkers(markerSet[key]);
      }
      // markerInfoByCode[clickedMarkerCode]?.overlay.setMap(null);
    });
    if (!markerInfoByCode[clickedMarkerCode]?.marker.getMap()) {
      markerInfoByCode[clickedMarkerCode]?.overlay.setMap(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markersVisibility]);

  const openStoreOverlay = useCallback(
    (store: IStore) => {
      markerInfoByCode[clickedMarkerCode]?.overlay.setMap(null);
      const markerInfo = markerInfoByCode[store.code];
      if (map && markerInfo) {
        markerInfo.overlay.setMap(map);
      }
      clickedMarkerCode = store.code;
    },
    [map]
  );

  return { addMarker, openStoreOverlay, closeOverlays };
};
