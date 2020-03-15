import { useEffect, useState, useCallback } from "react";
import { IMapOption, IKakaoMap, IMap, ILatLng } from "../Components/KakaoMap/types";
import { DEFAULT_ZOOM_LEVEL } from "../constants";

declare global {
  interface Window {
    kakao: {
      maps: IKakaoMap;
    };
  }
}

export default (ref: React.MutableRefObject<HTMLDivElement | null>, options: IMapOption) => {
  const [map, setMap] = useState<IMap>();

  useEffect(() => {
    const map = new window.kakao.maps.Map(ref.current, options);
    // API's maximum length is about 10000 which is zoom 6
    setMap(map);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const moveToLatLng = useCallback(
    (latLng: ILatLng) => {
      if (map) {
        map.setCenter(latLng);
        map.setLevel(DEFAULT_ZOOM_LEVEL);
      }
    },
    [map]
  );

  return { map, moveToLatLng };
};
