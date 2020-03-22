import moment, { Moment } from "moment";
import { IStore } from "../stores";
import { getFormattedDistance } from "../maps";
import { statusString } from "../../constants";
import { keys } from "../base";

const getCorrectStockAt = (stockAt?: string | Date, isLog: boolean = false) => {
  if (!stockAt) {
    return "확인중";
  }

  if (isLog) {
    return moment(new Date(stockAt)).format("LT");
  }

  const momentStock = moment(new Date(stockAt));
  if (momentStock.dayOfYear() !== moment().dayOfYear() && momentStock.isBefore(moment())) {
    return "입고대기";
  }
  return momentStock.format("LT");
};

// 주중, 주말에 대한 정보 제공
// e.g. 오전 10:26(주중), 오후 2:00(주말)
//
const getLatestStockInfo = (store: IStore) => {
  if (!store.latest_stock_ats || store.latest_stock_ats.length === 0) {
    return "";
  }

  let ret = {
    weekday: "",
    weekend: ""
  };
  const { latest_stock_ats: stockAts } = store;
  const today = moment().dayOfYear();

  // Get date info about weekday and weekend
  const targetDays: { weekday: Moment[]; weekend: Moment[] } = {
    weekday: [],
    weekend: []
  };
  const targetDay = {
    weekday: -1,
    weekend: -1
  };

  for (let i = stockAts.length - 1; i >= 0; i -= 1) {
    if (!stockAts[i].plenty) continue;
    const momentTime = moment(stockAts[i].plenty);
    let targetKey: keyof typeof targetDays = "weekday";
    if (momentTime.day() === 0 || momentTime.day() === 6) {
      targetKey = "weekend";
    }

    if (
      (targetDay[targetKey] < 0 || targetDay[targetKey] === momentTime.dayOfYear()) &&
      momentTime.dayOfYear() < today
    ) {
      targetDays[targetKey].push(momentTime);
      targetDay[targetKey] = momentTime.dayOfYear();
    }
  }

  keys(targetDays).forEach(key => {
    if (targetDays[key].length > 0) {
      const indicator = key === "weekday" ? " (주중)" : " (주말)";
      ret[key] = targetDays[key].map(el => el.format("LT")).join(", ") + indicator;
    }
  });

  // 주말
  return `
  <div class="_stockItem _stockTime">
    <div class="_stockItemCol">
      최근 입고시간 : 
    </div>
    <div class="_stockItemCol">
      <div class="_stockItemRow">
        ${ret.weekday}
      </div>
      ${ret.weekend ? `<div class="_stockItemRow">${ret.weekend}</div>` : ""}
    </div>
  </div>
  `;
};

const getInfoWindow = (store: IStore) => `
<div class="window_container">
  <div class="custom_window">
    <div class="rows">
      <div class="_row">
        <div class="_window_title">
          <span class="title">
            ${store.name}
          </span>
          <span class='distance'>
            ${store.distance >= 0 ? getFormattedDistance(store.distance) : ""}
          </span>
        </div>
      </div>
      <div class="_row">
        <div class="_stockItem">
          <div class="statusBox ${store.visible_remain_stat}">
            <span class="status">
              ${
                store.remain_stat === "break"
                  ? statusString[store.remain_stat]
                  : `재고 ${statusString[store.remain_stat]}`
              }
            </span>
          </div>
          ${
            !!store.created_at
              ? `<span class="createdAt">${moment(new Date(store.created_at)).fromNow()}</span>`
              : ""
          }
        </div>
        <div class="_stockItem">
          오늘 입고시간 : ${getCorrectStockAt(store.stock_at)}
        </div>
        ${getLatestStockInfo(store)}
        ${
          store.soldOutSpeed
            ? `<div class="_stockItem">평균 매진속도 : ${store.soldOutSpeed}</div>`
            : ""
        }
      </div>
    </div>

    <div class="rows">
      <div class="_row">
        <div class="address">${store.addr}</div>
      </div>
    </div>
    <div class="rows">
      <div class="_row">
        <div class="buttons">

          <div class="linkBox">
            <a target="_blank" href="https://map.kakao.com/link/to/${store.name},${store.lat},${
  store.lng
}">경로 찾기</a>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

// <div class="linkBox">
// <a target="_blank" href="https://map.kakao.com/link/to/${store.name},${store.lat},${
// store.lng
// }">통계 보기</a>
// </div>

export const getMapCustomOverlay = (store: IStore) =>
  new window.kakao.maps.CustomOverlay({
    position: new window.kakao.maps.LatLng(store.lat, store.lng),
    content: getInfoWindow(store),
    clickable: true,
    xAnchor: 0.516,
    yAnchor: 1.45,
    zIndex: 20
  });
