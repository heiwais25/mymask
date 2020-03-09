import { useState, useEffect, useCallback } from "react";
import { MapPositionInfo } from "./useKakaoMapPosition";
import { getMaxLength } from "../Components/utils/maps";
import axios from "axios";

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

export default (positionInfo: MapPositionInfo | undefined) => {
  const [stores, setStores] = useState<IStore[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (positionInfo) {
      setLoading(true);
      axios
        .get<StoreResponseData>(
          `https://nearby-maskmap.herokuapp.com/api/mask`,
          {
            params: {
              lat: positionInfo.center.getLat(),
              lng: positionInfo.center.getLng(),
              m: getMaxLength(positionInfo.bounds) / 2
            }
          }
        )
        .then(result => {
          setStores(result.data.stores);
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
