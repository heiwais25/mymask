import { IVisibleRemainStat, IStore } from "../stores";
import { getMapCustomOverlay } from "./overlay";
import { markerIcon } from "../../constants";
import { IMarker } from "../../Components/KakaoMap/types";

export const getEmptyMarkerSet = (): { [key in IVisibleRemainStat]: IMarker[] } => ({
  plenty: [],
  some: [],
  few: [],
  empty: []
});

const getMapMarkerIcon = (store: IStore) =>
  new window.kakao.maps.MarkerImage(
    markerIcon[store.visible_remain_stat],
    new window.kakao.maps.Size(24, 35),
    {
      offset: new window.kakao.maps.Point(16, 34),
      alt: "markerOfStore",
      shape: "rect"
      // coords: "1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33"
    }
  );

export const getMapMarkerOverlay = (store: IStore) => {
  const icon = getMapMarkerIcon(store);
  const overlay = getMapCustomOverlay(store);

  const marker = new window.kakao.maps.Marker({
    position: overlay.getPosition(),
    image: icon
  });

  return { marker, overlay };
};
