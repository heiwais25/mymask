import axios from "axios";
import { getDistance } from "geolib";
import { statusString } from "../constants";
import allSettled from "promise.allsettled";
import { ILatLng } from "../Components/KakaoMap/types";
import moment, { Duration } from "moment";
import { getFormattedTime } from "./time";
import _ from "lodash";
export type IVisibleRemainStat = "few" | "empty" | "some" | "plenty";

export type IRemainStat = "few" | "empty" | "some" | "plenty" | "break";

export type IRawStore = {
  addr: string;
  name: string;
  code: string;
  created_at: string;
  lat: number;
  lng: number;
  stock_at: string;
  type: string;
  remain_stat: IRemainStat;
};

export type IStore = {
  addr: string;
  name: string;
  code: string;
  created_at: string;
  lat: number;
  lng: number;
  stock_at: string;
  type: string;
  distance: number;
  status: string;
  remain_stat: IRemainStat;
  latestStockAtsAverage: {
    weekday: Date;
    weekend: Date;
  };
  soldOutSpeed: string;
  visible_remain_stat: IVisibleRemainStat;
  latest_click_counts: number;
  latest_stock_ats: { plenty?: Date; empty?: Date }[];
};

export type StoreResponseData = {
  count: number;
  stores: IStore[];
};

type IPartialStore = {
  name: string;
  addr: string;
  code: string;
};

const filterTargetCodes: { [key: string]: IPartialStore } = {
  "41833961": {
    code: "41833961",
    name: "경희한약국",
    addr: "경기도 부천시 경인로150번길 71, 101호 (송내동, 다올빌리지2차)"
  }
};

export const filterStore = (store: IStore) => {
  return !filterTargetCodes[store.code] && store.lat && store.lng;
};

function getFormattedAddress(address: string) {
  const braceletIdx = address.indexOf("(");
  if (braceletIdx < 0) {
    return address;
  }

  return address.slice(0, braceletIdx);
}

const fillStoreInfo = (store: IStore, currentLocation?: ILatLng) => {
  if (!store.remain_stat) {
    store.remain_stat = "empty";
  }

  store.status = statusString[store.remain_stat];

  if (store.remain_stat === "break") {
    store.visible_remain_stat = "empty";
  } else {
    store.visible_remain_stat = store.remain_stat;
  }

  if (currentLocation) {
    store.distance = getDistance(
      { lat: store.lat, lng: store.lng },
      {
        lat: currentLocation.getLat(),
        lng: currentLocation.getLng()
      }
    );
  } else {
    store.distance = -1;
  }

  const soldOutDuration: Duration[] = [];
  if (store.latest_stock_ats.length > 0) {
    store.latest_stock_ats.forEach(el => {
      if (el.plenty && el.empty && moment(el.empty).isAfter(moment(el.plenty))) {
        soldOutDuration.push(moment.duration(moment(el.empty).diff(moment(el.plenty))));
      }
    });
    if (soldOutDuration.length > 0) {
      store.soldOutSpeed = getFormattedTime(_.mean(soldOutDuration.map(el => el.asMilliseconds())));
    }
  }

  // Change address
  store.addr = getFormattedAddress(store.addr);

  return store;
};

export const getStoreInfoAPI = async (
  lat: number,
  lng: number,
  m: number,
  currentLocation?: ILatLng
): Promise<IStore[]> => {
  // Handle error

  const [rawResponse, logResponse] = await allSettled([
    axios.get<StoreResponseData>(process.env.REACT_APP_STORE_API || "", {
      params: {
        lat,
        lng,
        m
      }
    }),
    axios.get<StoreResponseData>(process.env.REACT_APP_STORE_LOG_API || "", {
      params: {
        lat,
        lng,
        m
      }
    })
  ]);

  const logResponseByCode: { [key: string]: IStore } = {};
  if (logResponse.status === "fulfilled") {
    logResponse.value.data.stores.forEach(store => {
      logResponseByCode[store.code] = store;
    });
  }

  let newStores: IStore[] = [];

  if (rawResponse.status === "fulfilled") {
    newStores = rawResponse.value.data.stores.map(store => ({
      ...store,
      lat: store.lat || logResponseByCode[store.code]?.lat,
      lng: store.lng || logResponseByCode[store.code]?.lng,
      latest_click_counts: logResponseByCode[store.code]?.latest_click_counts || 0,
      latest_stock_ats: logResponseByCode[store.code]?.latest_stock_ats || []
    }));
  }

  return newStores.map(store => fillStoreInfo(store, currentLocation)).filter(filterStore);
};
