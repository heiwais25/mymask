import { useCallback, useState, useEffect } from "react";
import { IStore } from "./useFetchStores";
import { ICustomOverlay, IMarker } from "../Components/KakaoMap/types";
import { IMap, IMarkerClusterer } from "../Components/KakaoMap/types";
import moment, { Moment } from "moment";

type Params = {
  map: IMap | undefined;
  clusterMinLevel?: number;
  onClick?: (store: IStore) => void;
};

export default ({
  map,
  clusterMinLevel = 7,
  onClick = (store: IStore) => null
}: Params) => {
  const [clusterer, setClusterer] = useState<IMarkerClusterer>();
  useEffect(() => {
    if (map) {
      setClusterer(
        new window.kakao.maps.MarkerClusterer({
          map,
          averageCenter: true,
          minLevel: clusterMinLevel
        })
      );
    }
  }, [map, clusterMinLevel]);

  const addMarker = useCallback(
    (oldMarkers: IMarker[], newStores: IStore[]) => {
      // Clear old Markers
      clusterer?.removeMarkers(oldMarkers);
      oldMarkers.forEach(marker => marker.setMap(null));

      let newMarkers: IMarker[] = [];
      if (map) {
        newMarkers = newStores.map(store => {
          const icon = new window.kakao.maps.MarkerImage(
            "/images/marker-red.png",
            new window.kakao.maps.Size(35, 50),
            {
              offset: new window.kakao.maps.Point(16, 34),
              alt: "마커 이미지 예제",
              shape: "poly",
              coords: "1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33"
            }
          );

          const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(store.lat, store.lng),
            image: icon
          });

          marker.setMap(map);
          return marker;
          // Save markers
        });
        clusterer?.addMarkers(newMarkers);
      }
      return newMarkers;
    },
    [map, clusterer]
  );

  return { addMarker };
};
