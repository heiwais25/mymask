import { useEffect, useState } from "react";
import { IMapOption, IKakaoMap, IMap } from "../Components/KakaoMap/types";

declare global {
  interface Window {
    kakao: {
      maps: IKakaoMap;
    };
  }
}

export default (
  ref: React.MutableRefObject<HTMLDivElement | null>,
  options: IMapOption
) => {
  const [map, setMap] = useState<IMap>();

  useEffect(() => {
    const map = new window.kakao.maps.Map(ref.current, options);
    // API's maximum length is about 10000 which is zoom 6
    map.setMaxLevel(6);
    setMap(map);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return map;
};
