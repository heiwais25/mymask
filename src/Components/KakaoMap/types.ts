import { CSSProperties, MutableRefObject } from "react";

export type IEventType =
  | "center_changed"
  | "zoom_start"
  | "zoom_changed"
  | "bounds_changed"
  | "click";

export type IKakaoMap = {
  LatLng: {
    new (lat: number, lng: number): ILatLng;
  };
  Size: {
    new (width: number, height: number): ISize;
  };
  Point: {
    new (x: number, y: number): IPoint;
  };

  Map: {
    new (ref: HTMLDivElement | null, options: IMapOption): IMap;
  };
  Marker: {
    new (option: {
      position: ILatLng;
      map?: IMap;
      draggable?: boolean;
      clickable?: boolean;
      opacity?: number;
      range?: number;
      zIndex?: number;
      image?: IMarkerImage;
    }): IMarker;
  };
  MarkerImage: {
    new (
      src: string,
      size: ISize,
      option: {
        alt?: string;
        coords?: string;
        shape?: string;
        offset?: IPoint;
        spriteOrigin?: IPoint;
        spriteSize?: ISize;
      }
    ): IMarkerImage;
  };
  InfoWindow: {
    new (option: {
      map?: IMap;
      content: string;
      position: ILatLng;
      removable?: boolean;
      zIndex?: number;
      disableAutoPan?: boolean;
    }): IInfoWindow;
  };
  CustomOverlay: {
    new (option: {
      map?: IMap;
      content: string;
      position: ILatLng;
      clickable?: boolean;
      zIndex?: number;
      xAnchor?: number;
      yAnchor?: number;
    }): ICustomOverlay;
  };
  MarkerClusterer: {
    new (option: {
      averageCenter: boolean;
      minLevel?: number;
      map?: IMap;
      markers?: IMarker[];
      gridSize?: number;
      calculator?: number[];
      disableClickZoom?: boolean;
      styles?: CSSProperties[];
      calculater?: number[];
      minClusterSize?: number;
    }): IMarkerClusterer;
  };
  Circle: {
    new (option: {
      map?: IMap;
      center: ILatLng;
      radius: number;
      strokeWeight: number;
      strokeColor: string;
      strokeOpacity: number;
      strokeStyle: string;
      fillColor: string;
      fillOpacity: number;
    }): ICircle;
  };

  StaticMap: {
    new (container: HTMLElement | null, option: { center: ILatLng; level: number }): IStaticMap;
  };
  event: {
    addListener: (
      map: IMap | ICustomOverlay | IMarker,
      eventType: IEventType,
      callback: () => void,
      option?: { passive: boolean }
    ) => void;
    removeListener: (
      map: IMap | ICustomOverlay | IMarker,
      eventType: IEventType,
      callback: () => void
    ) => void;
  };
  services: {
    Places: {
      new (): IPlace;
    };
    Geocoder: {
      new (): IGeoCoder;
    };
  };
};

export type IMeta = {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
};

export type IDocument = {
  address_name: string;
  address_type: string;
  x: string;
  y: string;
  address: string;
  road_address: string;
  place_name: string;
  category_name: string;
  category_group_code: string;
  category_group_name: string;
};

export type IStatus = "OK" | "ZERO_RESULT" | "ERROR";

export type IPlace = {
  setMap: (map: IMap) => void;
  keywordSearch: (
    keyword: string,
    callback: (result: IDocument[], status: IStatus) => void,
    options?: {
      category_group_code?: string;
      location?: ILatLng;

      x?: number;
      y?: number;
      radius?: number;
      bounds?: ILatLngBounds;
      rect?: string;
      size?: number;
      page?: number;
      sort?: string;
      useMapCenter?: boolean;
      useMapBounds?: boolean;
    }
  ) => void;
};

export type ILatLng = {
  get: () => ILatLng;
  Ga: number;
  Ha: number;
  getLat: () => number;
  getLng: () => number;
  equals: (latLng: ILatLng) => boolean;
};

export type ISize = {
  equals: (size: ISize) => boolean;
  toString: () => string;
};

export type IPoint = {
  equals: (point: IPoint) => boolean;
  toString: () => string;
};

export type IMapOption = {
  center: ILatLng;
  level: number;
  disableDoubleClick?: boolean;
  disableDoubleClickZoom?: boolean;
};

export type ILatLngBounds = {
  toString: () => string;
  extend: (latLng: ILatLng) => void;
  contain: (latLng: ILatLng) => boolean;
  isEmpty: () => boolean;
  getSouthWest: () => ILatLng;
  getNorthEast: () => ILatLng;
};

export type IMap = {
  setCenter: (latLng: ILatLng) => void;
  panTo: (latLng: ILatLng) => void;
  getBounds: () => ILatLngBounds;
  getCenter: () => ILatLng;
  getLevel: () => number;
  setMaxLevel: (level: number) => void;
  setLevel: (
    level: number,
    options?: {
      anchor?: ILatLng;
      animate?:
        | boolean
        | {
            duration: number;
          };
    }
  ) => void;
  event: unknown;
};

export type IMarker = {
  setMap: (map: IMap | null) => void;
  getMap: () => IMap;
  setPosition: (latLng: ILatLng) => void;
  getPosition: () => ILatLng;
  setZIndex: (zIndex: number) => void;
  getZIndex: () => number;
  setVisible: (visible: boolean) => void;
  getVisible: () => boolean;
  setTitle: (title: string) => void;
  getTitle: () => string;
  setDraggable: (draggable: boolean) => void;
  getDraggable: () => boolean;
  setClickable: (clickable: boolean) => void;
  getClickable: () => boolean;
  setImage: (image: IMarkerImage) => void;
};

export type IMarkerImage = {};

export type IInfoWindow = {
  open: (map: IMap, marker: IMarker) => void;
  close: () => void;
  getMap: () => IMap;
  setPosition: (latLng: ILatLng) => void;
  getPosition: () => ILatLng;
  setContent: (el: string) => void;
  getContent: () => string;
  setZIndex: (zIndex: number) => void;
  getZIndex: () => number;
  setRange: (range: number) => void;
  getRange: () => number;
};

export type ICustomOverlay = {
  open: (map: IMap, marker: IMarker) => void;
  close: () => void;
  setMap: (map: IMap | null) => void;
  getMap: () => IMap;
  setPosition: (latLng: ILatLng) => void;
  getPosition: () => ILatLng;
  setContent: (el: string) => void;
  getContent: () => string;
  setZIndex: (zIndex: number) => void;
  getZIndex: () => number;
  setRange: (range: number) => void;
  getRange: () => number;
};

export type IMarkerClusterer = {
  addMarker: (marker: IMarker | ICustomOverlay, nodraw?: boolean) => void;
  removeMarker: (marker: IMarker | ICustomOverlay) => void;
  addMarkers: (marker: IMarker[], nodraw?: boolean) => void;
  removeMarkers: (marker: IMarker[]) => void;
  clear: () => void;
  redraw: () => void;
  getGridSize: () => number;
  setGridSize: (size: number) => void;
  getMinClusterSize: () => number;
  setMinClusterSize: (size: number) => void;
  getAverageCenter: () => void;
  setAverageCenter: (bool: boolean) => void;
  getMinLevel: () => void;
  setMinLevel: (level: number) => void;
  getTexts: () => string;
  setTexts: (text: string) => void;
};

export type ICircle = {
  setMap: (map: IMap | null) => void;
  getMap: () => IMap;
  setPosition: (latLng: ILatLng) => void;
  getPosition: () => ILatLng;
  setRadius: (radius: number) => void;
  getRadius: () => number;
};

export type IStaticMap = {
  setCenter: (latLng: ILatLng) => void;
  getCenter: () => ILatLng;
};

export type IGeoCoder = {
  addressSearch: (
    addr: string,
    callback: (result: string, status: IStatus) => void,
    options?: {
      page?: number;
      size?: number;
    }
  ) => void;
  coord2Address: (
    x: number,
    y: number,
    callback: (result: { address: { address_name: string } }[], status: IStatus) => void,
    options?: {
      input_coords?: unknown;
    }
  ) => void;
};
