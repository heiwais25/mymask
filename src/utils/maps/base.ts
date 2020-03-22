import { getDistance } from "geolib";
import { ILatLng } from "../../Components/KakaoMap/types";
import _ from "lodash";

export const getLatLngDistance = (a: ILatLng, b: ILatLng) => {
  return getDistance({ lat: a.getLat(), lng: a.getLng() }, { lat: b.getLat(), lng: b.getLng() });
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

export const convertCoord2AddressAPI = async (latlng: ILatLng) => {
  const geocoder = new window.kakao.maps.services.Geocoder();
  return new Promise<string>((res, rej) => {
    geocoder.coord2Address(latlng.getLng(), latlng.getLat(), (result, state) => {
      if (state === "OK") {
        res(result[0].address.address_name);
      } else {
        rej("NoElement");
      }
    });
  });
};

// distance [m] => [m, km]
export const getFormattedDistance = (distance: number) => {
  if (distance >= 1e5) {
    return `${_.toInteger(distance / 1e3)}km`;
  } else if (distance >= 1e3) {
    return `${_.floor(distance / 1e3, 2)}km`;
  }
  return `${distance}m`;
};
