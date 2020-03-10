import { getDistance } from "geolib";
import { ILatLngBounds, ILatLng } from "../KakaoMap/types";
import _ from "lodash";

export const getLatLngDistance = (a: ILatLng, b: ILatLng) => {
  return getDistance(
    { lat: a.getLat(), lng: a.getLng() },
    { lat: b.getLat(), lng: b.getLng() }
  );
};

export const getMaxLength = (bounds: ILatLngBounds) => {
  const southWest = bounds.getSouthWest();
  const northEast = bounds.getNorthEast();

  const maxLength =
    _.max([
      getDistance(
        { lat: 0, lng: southWest.getLng() },
        { lat: 0, lng: northEast.getLng() }
      ),
      getDistance(
        { lat: southWest.getLat(), lng: 0 },
        { lat: northEast.getLat(), lng: 0 }
      )
    ]) || 500;
  return maxLength;
};

export const isLatLngEqaul = (a?: ILatLng, b?: ILatLng) => {
  if (!a || !b) {
    return false;
  }
  const resolution = 10;

  return (
    getDistance(
      { lat: a.getLat(), lng: a.getLng() },
      { lat: b.getLat(), lng: b.getLng() }
    ) < resolution
  );
};
