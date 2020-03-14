import { useCallback, useState, useEffect } from "react";
import { IStore, IVisibleRemainStat } from "./useFetchStores";
import { IMarker, ICustomOverlay, ILatLng, ICircle } from "../Components/KakaoMap/types";
import { IMap, IMarkerClusterer } from "../Components/KakaoMap/types";
import _ from "lodash";
import { getInfoWindow } from "../Components/utils/maps";
import { markerIcon, FETCH_DISTANCE } from "../constants";
import theme from "../Styles/Theme";

type Params = {
  map: IMap | undefined;
  clusterMinLevel?: number;
  onClick?: (store: IStore) => void;
};

export default ({ map, clusterMinLevel = 7, onClick = (store: IStore) => null }: Params) => {
  const [clusterer, setClusterer] = useState<IMarkerClusterer>();
  const [overlays, setOverlays] = useState<ICustomOverlay[]>([]);
  const circles: ICircle[] = [];

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
    }
  }, [map, clusterMinLevel]);

  useEffect(() => {
    if (map) {
      window.kakao.maps.event.addListener(map, "click", () => {
        overlays.forEach(overlay => overlay.setMap(null));
      });
    }
  }, [map, overlays]);

  const addMarker = useCallback(
    (
      oldMarkers: { [key in IVisibleRemainStat]: IMarker[] },
      newStores: IStore[],
      filterState?: { [key in IVisibleRemainStat]: boolean },
      lastFetchLatLng?: ILatLng
    ) => {
      if (map && lastFetchLatLng) {
        circles.forEach(circle => circle.setMap(null));

        const circle = new window.kakao.maps.Circle({
          center: lastFetchLatLng, // 원의 중심좌표 입니다
          radius: FETCH_DISTANCE, // 미터 단위의 원의 반지름입니다
          strokeWeight: 1, // 선의 두께입니다
          strokeColor: theme.darkGreyColor, // 선의 색깔입니다
          strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle: "solid", // 선의 스타일 입니다
          fillColor: theme.lightPrimaryColor, // 채우기 색깔입니다
          fillOpacity: 0.3 // 채우기 불투명도 입니다
        });
        circle.setMap(map);
        circles.push(circle);
      }

      const newMarkers: { [key in IVisibleRemainStat]: IMarker[] } = {
        plenty: [],
        some: [],
        few: [],
        empty: []
      };
      overlays.splice(0, overlays.length);
      let zIndex = 0;
      let testInfos: ICustomOverlay[] = [];

      const flattenMarkers = _.flatten(Object.values(oldMarkers));
      // Clear old Markers
      clusterer?.removeMarkers(flattenMarkers);
      flattenMarkers.forEach(marker => marker.setMap(null));
      let newInfos: ICustomOverlay[] = [];
      if (map) {
        newStores.forEach(store => {
          const icon = new window.kakao.maps.MarkerImage(
            markerIcon[store.visible_remain_stat],
            new window.kakao.maps.Size(28, 40),
            {
              offset: new window.kakao.maps.Point(16, 34),
              alt: "markerOfStore",
              shape: "rect"
              // coords: "1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33"
            }
          );

          const latlng = new window.kakao.maps.LatLng(store.lat, store.lng);
          const marker = new window.kakao.maps.Marker({
            position: latlng,
            image: icon
          });

          const customOverlay = new window.kakao.maps.CustomOverlay({
            position: latlng,
            content: getInfoWindow(store),
            clickable: true,
            xAnchor: 0.5,
            yAnchor: 1.5,
            zIndex: 999
          });
          testInfos.push(customOverlay);
          newInfos.push(customOverlay);

          // Event 등록
          window.kakao.maps.event.addListener(marker, "click", () => {
            zIndex += 1;
            testInfos.forEach(info => {
              if (info === customOverlay && !customOverlay.getMap()) {
                info.setMap(map);
              } else {
                info.setMap(null);
              }
            });
            marker.setZIndex(zIndex);
            map.panTo(latlng);
          });

          marker.setMap(map);

          newMarkers[store.visible_remain_stat].push(marker);

          return marker;
        });
        clusterer?.addMarkers(_.flatten(Object.values(newMarkers)));

        if (filterState) {
          Object.keys(filterState).forEach(key => {
            if (!filterState[key as IVisibleRemainStat]) {
              clusterer?.removeMarkers(newMarkers[key as IVisibleRemainStat]);
            }
          });
        }
        setOverlays(newInfos);
      }
      return { markers: newMarkers, overlays: newInfos };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
