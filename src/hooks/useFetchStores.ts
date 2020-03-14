import { useState, useEffect, useCallback } from "react";
import { MapPositionInfo } from "./useKakaoMapPosition";
import { getLatLngDistance } from "../Components/utils/maps";
import axios from "axios";
import moment from "moment";
import { ILatLng } from "../Components/KakaoMap/types";
import { TIME_INTERVAL, FETCH_DISTANCE, statusString } from "../constants";
import { getDistance } from "geolib";
import { filterStores } from "../storeFilter";

export type IRemainStat = "few" | "empty" | "some" | "plenty" | "break";

export type IVisibleRemainStat = "few" | "empty" | "some" | "plenty";

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
  visible_remain_stat: IVisibleRemainStat;
};

export type StoreResponseData = {
  count: number;
  stores: IStore[];
};

type lastFetchInfo = {
  latlng?: ILatLng;
  time?: Date;
};

const fillStoreInfo = (store: IStore, center: ILatLng) => {
  if (!store.remain_stat) {
    store.remain_stat = "empty";
  }

  store.status = statusString[store.remain_stat];

  if (store.remain_stat === "break") {
    store.visible_remain_stat = "empty";
  } else {
    store.visible_remain_stat = store.remain_stat;
  }

  store.distance = getDistance(
    { lat: store.lat, lng: store.lng },
    {
      lat: center.getLat(),
      lng: center.getLng()
    }
  );

  return store;
};

export default (positionInfo: MapPositionInfo | undefined) => {
  const [stores, setStores] = useState<IStore[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastFetchInfo, setLastFetchInfo] = useState<lastFetchInfo>({});

  useEffect(() => {
    if (positionInfo) {
      const currentFetchTime = moment();
      // If the limit doesn't change, doesn't fetch
      if (
        lastFetchInfo.time &&
        currentFetchTime.isBefore(moment(lastFetchInfo.time).add(TIME_INTERVAL, "m")) &&
        lastFetchInfo.latlng &&
        getLatLngDistance(positionInfo.center, lastFetchInfo.latlng) < FETCH_DISTANCE * 0.7
      ) {
        return;
      }

      setLoading(true);
      axios
        .get<StoreResponseData>(process.env.REACT_APP_STORE_API || "", {
          params: {
            lat: positionInfo.center.getLat(),
            lng: positionInfo.center.getLng(),
            m: FETCH_DISTANCE
          }
        })
        .then(result => {
          // DISTANCE 계산
          setLastFetchInfo({
            latlng: positionInfo.center,
            time: currentFetchTime.toDate()
          });

          setStores(
            filterStores(result.data.stores)
              .filter(store => store.lat && store.lng)
              .map(store => {
                return fillStoreInfo(store, positionInfo.center);
              })
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionInfo]);

  const clearStores = useCallback(() => {
    setStores([]);
  }, []);

  return { stores, lastFetchInfo, setStores, clearStores, loading };
};
