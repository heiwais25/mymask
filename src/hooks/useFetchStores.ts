import { useState, useEffect, useCallback } from "react";
import { MapPositionInfo } from "./useKakaoMapPosition";
import { getLatLngDistance } from "../utils/maps";
import moment from "moment";
import { ILatLng } from "../Components/KakaoMap/types";
import { TIME_INTERVAL, FETCH_DISTANCE } from "../constants";
import { getStoreInfoAPI, IStore } from "../utils/stores";

type lastFetchInfo = {
  latlng?: ILatLng;
  time?: Date;
};

export default (positionInfo: MapPositionInfo | undefined, currentLocation?: ILatLng) => {
  const [stores, setStores] = useState<IStore[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastFetchInfo, setLastFetchInfo] = useState<lastFetchInfo>({});
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    if (positionInfo) {
      const currentFetchTime = moment();
      // If the limit doesn't change, doesn't fetch
      if (
        !reloading &&
        lastFetchInfo.time &&
        currentFetchTime.isBefore(moment(lastFetchInfo.time).add(TIME_INTERVAL, "m")) &&
        lastFetchInfo.latlng &&
        getLatLngDistance(positionInfo.center, lastFetchInfo.latlng) < FETCH_DISTANCE * 0.7
      ) {
        return;
      }

      setLoading(true);

      getStoreInfoAPI(
        positionInfo.center.getLat(),
        positionInfo.center.getLng(),
        FETCH_DISTANCE,
        currentLocation
      )
        .then(result => {
          setLastFetchInfo({
            latlng: positionInfo.center,
            time: currentFetchTime.toDate()
          });

          setStores(result);
        })
        .finally(() => {
          setLoading(false);
          setReloading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionInfo, reloading, currentLocation]);

  const clearStores = useCallback(() => {
    setStores([]);
  }, []);

  const reloadStores = useCallback(() => {
    setReloading(true);
  }, []);

  return { stores, lastFetchInfo, setStores, clearStores, reloadStores, loading };
};
