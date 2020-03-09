import { useCallback, useState, useEffect } from "react";
import { IStore } from "./useFetchStores";
import { ICustomOverlay } from "../Components/KakaoMap/types";
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

  // key : code
  // 생성되면 store, marker
  const lastOverlayStatus: {
    [key in string]: {
      created_at: Moment;
      overlay: ICustomOverlay;
    };
  } = {};

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
    (store: IStore) => {
      if (map) {
        let status = lastOverlayStatus[store.code];
        let refresh = false;

        // 시간을 체크하여
        if (status && moment(store.created_at).isAfter(status.created_at)) {
          const overlay = status.overlay;
          overlay.setMap(null);

          delete lastOverlayStatus[store.code];
          refresh = true;
          clusterer?.removeMarker(overlay);
        }

        if (!status || refresh) {
          const overlay = new window.kakao.maps.CustomOverlay({
            map,
            position: new window.kakao.maps.LatLng(store.lat, store.lng),
            content: `<div class="store_marker"><div class="store_name">${store.name}</div>
                      <div class="store_meta">${store.addr}</div></div>`,
            xAnchor: 0.5,
            yAnchor: 1.3,
            clickable: true
          });

          window.kakao.maps.event.addListener(overlay, "click", () => {
            console.log("eee");
            onClick(store);
          });

          // const marker = new window.kakao.maps.Marker({
          //   position: new window.kakao.maps.LatLng(store.lat, store.lng)
          // });

          // marker.setMap(map);
          // customOverlay.setMap(map);
          clusterer?.addMarker(overlay);

          // Save for compare in later
          lastOverlayStatus[store.code] = {
            created_at: moment(store.created_at),
            overlay
          };
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [map, clusterer]
  );

  return { addMarker };
};
