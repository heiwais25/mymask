import { useCallback } from "react";
import { ILatLng } from "../Components/KakaoMap/types";

export const useGeoLocation = () => {
  return useCallback((onSuccess: (latLng: ILatLng) => void, onError = undefined) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        onSuccess(
          new window.kakao.maps.LatLng(position.coords.latitude, position.coords.longitude)
        );
      },
      error => {
        if (onError) {
          onError({
            code: error.code,
            message: error.message
          });
        }
      }
    );
  }, []);
};
