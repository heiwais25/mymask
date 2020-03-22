import { IRemainStat, IVisibleRemainStat } from "./utils/stores";
import moment from "moment";
import { isMobile } from "react-device-detect";

export const THIS_URL = "https://mymask.info";

export const STORE_LIST_DIALOG = "#STORE_LIST_DIALOG";
export const STORE_DETAIL_DIALOG = "#STORE_DETAIL_DIALOG";
export const SEARCH_DIALOG = "#SEARCH_DIALOG";
export const NOTICE_DIALOG = "#NOTICE_DIALOG";
export const BOOKMARK_DIALOG = "#BOOKMARK_DIALOG";
export const BOOKMARK_EDIT_DIALOG = "?BOOKMARK_EDIT_DIALOG";
export const BOOKMARK_KEY = "BOOKMARK_KEY";

export const TIME_INTERVAL = 2; // in minute
export const FETCH_DISTANCE = 2000; // in minute

export const version = process.env.REACT_APP_PUBLISH_VERSION || "v1.0.4";
export const updateDate = moment(process.env.REACT_APP_PUBLISH_DATE).toDate() || moment().toDate();
export const NOTICE_CHECK_TOKEN = `${version}/dialog-check`;
export const NOTICE_CHECK_KEY = "dialog-check-key";

export const DEFAULT_ZOOM_LEVEL = isMobile ? 4 : 3;
export const CLUSTER_MIN_LEVEL = isMobile ? 5 : 4;

export const statusString: { [key in IRemainStat]: string } = {
  plenty: "충분",
  some: "보통",
  few: "부족",
  empty: "없음",
  break: "판매 중지"
};

export type IMarkerColor = "green" | "yellow" | "red" | "grey";

export const statusColor: { [key in IVisibleRemainStat]: IMarkerColor } = {
  plenty: "green",
  some: "yellow",
  few: "red",
  empty: "grey"
};

export const rangeString: { [key in IVisibleRemainStat]: string } = {
  plenty: "100개 이상",
  some: "30 ~ 99개",
  few: "2 ~ 29개",
  empty: "0 ~ 1개"
};

export const markerIcon: { [key in IVisibleRemainStat]: string } = {
  plenty: "/images/marker-green.png",
  some: "/images/marker-yellow.png",
  few: "/images/marker-red.png",
  empty: "/images/marker-grey.png"
};
