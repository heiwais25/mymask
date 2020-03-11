import { IMap, ILatLngBounds, ILatLng } from "../Components/KakaoMap/types";
import { useState, useEffect } from "react";

export type MapPositionInfo = {
  center: ILatLng;
  bounds: ILatLngBounds;
};

type Params = {
  map: IMap | undefined;
  debounce?: number;
};

export default ({ map, debounce = 1000 }: Params) => {
  const [position, setPositions] = useState<MapPositionInfo>();
  const [firstInit, setFirstInit] = useState(false);
  const [timeouts] = useState<number[]>([]);

  useEffect(() => {
    if (map && !firstInit) {
      setPositions({ bounds: map.getBounds(), center: map.getCenter() });

      window.kakao.maps.event.addListener(map, "bounds_changed", () => {
        if (timeouts.length > 0) {
          timeouts.forEach(id => clearTimeout(id));
          timeouts.pop();
        }
        timeouts.push(
          setTimeout(
            () =>
              setPositions({
                bounds: map.getBounds(),
                center: map.getCenter()
              }),
            debounce
          )
        );
      });
      setFirstInit(true);
    }
  }, [map, firstInit, debounce, timeouts]);

  return position;
};
