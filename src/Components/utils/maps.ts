import { getDistance } from "geolib";
import { ILatLngBounds, ILatLng, IMarker } from "../KakaoMap/types";
import _ from "lodash";
import moment from "moment";
import { IStore, IVisibleRemainStat } from "../../hooks/useFetchStores";
import { statusString, rangeString, markerIcon } from "../../constants";

export const getLatLngDistance = (a: ILatLng, b: ILatLng) => {
  return getDistance({ lat: a.getLat(), lng: a.getLng() }, { lat: b.getLat(), lng: b.getLng() });
};

export const getMaxLength = (bounds: ILatLngBounds) => {
  const southWest = bounds.getSouthWest();
  const northEast = bounds.getNorthEast();

  const maxLength =
    _.max([
      getDistance({ lat: 0, lng: southWest.getLng() }, { lat: 0, lng: northEast.getLng() }),
      getDistance({ lat: southWest.getLat(), lng: 0 }, { lat: northEast.getLat(), lng: 0 })
    ]) || 500;
  return maxLength;
};

export const isLatLngEqaul = (a?: ILatLng, b?: ILatLng) => {
  if (!a || !b) {
    return false;
  }
  const resolution = 10;

  return (
    getDistance({ lat: a.getLat(), lng: a.getLng() }, { lat: b.getLat(), lng: b.getLng() }) <
    resolution
  );
};

export const getCorrectStockAt = (stockAt?: string) => {
  if (!stockAt) {
    return "확인중";
  }

  const momentStock = moment(new Date(stockAt));
  if (momentStock.dayOfYear() !== moment().dayOfYear() && momentStock.isBefore(moment())) {
    return "입고대기";
  }
  return momentStock.format("LT");
};

export const getInfoWindow = (store: IStore) => `
<div class="custom_window">
<div class="rows">
  <div class="_window_col">
    <div class="_row" style="display:flex; align-items:center">
      <div class="_window_title">${store.name}</div>
      <span class="distance">${store.distance} m</span>
    </div>
    <div class="_row address">${store.addr}</div>
    <div class="_row">
      입고시간 : ${getCorrectStockAt(store.stock_at)}
    </div>
    <div class="_row">
      업데이트 : ${!!store.created_at ? moment(new Date(store.created_at)).fromNow() : "확인중"}
    </div>
  </div>
  <div class="_window_col _stock" style="justify-content: center; align-items: center; display: ;">
    <span style="text-align: center; font-size: 14px;"> 재고수 </span>
    <span class="${store.remain_stat}" style="font-size: 20px;">
      ${statusString[store.remain_stat]}
    </span>
    ${
      store.remain_stat !== "break"
        ? `<span style="text-align: center;"> ${rangeString[store.visible_remain_stat]} </span>`
        : ""
    }
  </div>
</div>
<div class="rows">
  <div class="_row">
    <div class="linkBox">
      <a target="_blank" href="https://map.kakao.com/link/to/${store.name},${store.lat},${
  store.lng
}">경로 찾기</a>
    </div>
  </div>
</div>
</div>
  `;

export const getEmptyMarkerSet = (): { [key in IVisibleRemainStat]: IMarker[] } => ({
  plenty: [],
  some: [],
  few: [],
  empty: []
});

export const getMapMarkerIcon = (store: IStore) =>
  new window.kakao.maps.MarkerImage(
    markerIcon[store.visible_remain_stat],
    new window.kakao.maps.Size(28, 40),
    {
      offset: new window.kakao.maps.Point(16, 34),
      alt: "markerOfStore",
      shape: "rect"
      // coords: "1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33"
    }
  );

export const getMapCustomOverlay = (store: IStore) =>
  new window.kakao.maps.CustomOverlay({
    position: new window.kakao.maps.LatLng(store.lat, store.lng),
    content: getInfoWindow(store),
    clickable: true,
    xAnchor: 0.5,
    yAnchor: 1.35,
    zIndex: 999
  });

export const getMapMarkerOverlay = (store: IStore) => {
  const icon = getMapMarkerIcon(store);
  const overlay = getMapCustomOverlay(store);

  const marker = new window.kakao.maps.Marker({
    position: overlay.getPosition(),
    image: icon
  });

  return { marker, overlay };
};
