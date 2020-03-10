import { useCallback, useState, useEffect } from "react";
import { IStore, IRemainStat } from "./useFetchStores";
import { IMarker } from "../Components/KakaoMap/types";
import { IMap, IMarkerClusterer } from "../Components/KakaoMap/types";
import _ from "lodash";

type Params = {
  map: IMap | undefined;
  clusterMinLevel?: number;
  onClick?: (store: IStore) => void;
};

const markerIcon: { [key in IRemainStat]: string } = {
  plenty: "/images/marker-green.png",
  some: "/images/marker-yellow.png",
  few: "/images/marker-red.png",
  empty: "/images/marker-grey.png"
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
          minLevel: clusterMinLevel,
          gridSize: 80,
          calculator: [0],
          minClusterSize: 1
        })
      );
    }
  }, [map, clusterMinLevel]);

  const addMarker = useCallback(
    (
      oldMarkers: { [key in IRemainStat]: IMarker[] },
      newStores: IStore[],
      filterState?: { [key in IRemainStat]: boolean }
    ) => {
      const newMarkers: { [key in IRemainStat]: IMarker[] } = {
        plenty: [],
        some: [],
        few: [],
        empty: []
      };

      const flattenMarkers = _.flatten(Object.values(oldMarkers));
      // Clear old Markers
      clusterer?.removeMarkers(flattenMarkers);
      flattenMarkers.forEach(marker => marker.setMap(null));

      if (map) {
        newStores.forEach(store => {
          const icon = new window.kakao.maps.MarkerImage(
            markerIcon[store.remain_stat],
            new window.kakao.maps.Size(35, 50),
            {
              offset: new window.kakao.maps.Point(16, 34),
              alt: "markerOfStore",
              shape: "poly",
              coords: "1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33"
            }
          );

          const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(store.lat, store.lng),
            image: icon
          });

          marker.setMap(map);

          newMarkers[store.remain_stat].push(marker);

          return marker;
          // Save markers
        });
        clusterer?.addMarkers(_.flatten(Object.values(newMarkers)));

        if (filterState) {
          Object.keys(filterState).forEach(key => {
            if (!filterState[key as IRemainStat]) {
              clusterer?.removeMarkers(newMarkers[key as IRemainStat]);
            }
          });
        }
      }
      return newMarkers;
    },
    [map, clusterer]
  );

  const setMarkersVisible = useCallback(
    (markers: IMarker[]) => {
      clusterer?.addMarkers(markers);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [map, clusterer]
  );

  const setMarkersHidden = useCallback(
    (markers: IMarker[]) => {
      clusterer?.removeMarkers(markers);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [map, clusterer]
  );

  return { addMarker, setMarkersVisible, setMarkersHidden };
};
