import { CSSProperties } from "react";

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
  event: {
    addListener: (
      map: IMap | ICustomOverlay | IMarker,
      eventType: IEventType,
      callback: () => void
    ) => void;
    removeListener: (
      map: IMap | ICustomOverlay | IMarker,
      eventType: IEventType,
      callback: () => void
    ) => void;
  };
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
