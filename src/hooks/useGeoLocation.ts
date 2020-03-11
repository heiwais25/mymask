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

export const revokePermission = () =>
  new Promise((res, rej) => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(result => {
        if (result.state === "granted") {
          res(true);
        } else {
          res(false);
        }
      })
      .catch(err => rej(err));
  });
