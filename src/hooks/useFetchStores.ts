import { useState, useEffect, useCallback } from "react";
import { MapPositionInfo } from "./useKakaoMapPosition";
import { getLatLngDistance } from "../Components/utils/maps";
import axios from "axios";
import moment from "moment";
import { ILatLng } from "../Components/KakaoMap/types";
import { TIME_INTERVAL, FETCH_DISTANCE } from "../constants";
import { getDistance } from "geolib";
import { filterStores } from "../storeFilter";

export type IRemainStat = "few" | "empty" | "some" | "plenty";

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
  remain_stat: IRemainStat;
};

export type StoreResponseData = {
  count: number;
  stores: IStore[];
};

type lastFetchInfo = {
  latlng?: ILatLng;
  time?: Date;
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
        getLatLngDistance(positionInfo.center, lastFetchInfo.latlng) < FETCH_DISTANCE
      ) {
        return;
      }

      setLoading(true);
      axios
        .get<StoreResponseData>(process.env.REACT_APP_STORE_API || "", {
          params: {
            lat: positionInfo.center.getLat(),
            lng: positionInfo.center.getLng(),
            m: FETCH_DISTANCE * 1.5
          }
        })
        .then(result => {
          setStores(
            filterStores(result.data.stores)
              .filter(store => store.lat && store.lng)
              .map(store => {
                const { lat, lng, remain_stat, ...extra } = store;
                console.log(lat, lng);
                return {
                  lat,
                  lng,
                  remain_stat:
                    remain_stat !== "empty" &&
                    remain_stat !== "few" &&
                    remain_stat !== "some" &&
                    remain_stat !== "plenty"
                      ? "empty"
                      : remain_stat,
                  distance: getDistance(
                    { lat, lng },
                    {
                      lat: positionInfo.center.getLat(),
                      lng: positionInfo.center.getLng()
                    }
                  ),
                  ...extra
                };
              })
          );
          // DISTANCE 계산

          setLastFetchInfo({
            latlng: positionInfo.center,
            time: currentFetchTime.toDate()
          });
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

  return { stores, setStores, clearStores, loading };
};
