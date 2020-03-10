import { useState, useEffect, useCallback } from "react";
import { MapPositionInfo } from "./useKakaoMapPosition";
import { getLatLngDistance } from "../Components/utils/maps";
import axios from "axios";
import moment from "moment";
import { ILatLng } from "../Components/KakaoMap/types";
import { TIME_INTERVAL, FETCH_DISTANCE } from "../constants";

export type IStore = {
  code: number;
  created_at: string;
  name: string;
  type: string;
  addr: string;
  distance: number;
  sold_cnt: number;
  sold_out: boolean;
  stock_cnt: number;
  stock_t: string;
  lat: number;
  lng: number;
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
        currentFetchTime.isBefore(
          moment(lastFetchInfo.time).add(TIME_INTERVAL, "m")
        ) &&
        lastFetchInfo.latlng &&
        getLatLngDistance(positionInfo.center, lastFetchInfo.latlng) <
          FETCH_DISTANCE
      ) {
        return;
      }

      setLoading(true);
      axios
        .get<StoreResponseData>(
          `https://nearby-maskmap.herokuapp.com/api/mask`,
          {
            params: {
              lat: positionInfo.center.getLat(),
              lng: positionInfo.center.getLng(),
              m: FETCH_DISTANCE * 1.5
            }
          }
        )
        .then(result => {
          setStores(result.data.stores);
          setLastFetchInfo({
            latlng: positionInfo.center,
            time: currentFetchTime.toDate()
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [positionInfo]);

  const clearStores = useCallback(() => {
    setStores([]);
  }, []);

  return { stores, setStores, clearStores, loading };
};
