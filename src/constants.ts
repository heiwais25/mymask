import { IRemainStat, IVisibleRemainStat } from "./hooks/useFetchStores";
export const STORE_LIST_DIALOG = "#STORE_LIST_DIALOG";
export const STORE_DETAIL_DIALOG = "#STORE_DETAIL_DIALOG";
export const SEARCH_DIALOG = "#SEARCH_DIALOG";

export const TIME_INTERVAL = 2; // in minute
export const FETCH_DISTANCE = 1500; // in minute

export const DIALOG_CHECK_TOKEN = "v0.0.4/dialog-check";
export const DIALOG_CHECK_KEY = "dialog-check-key";

export const statusString: { [key in IRemainStat]: string } = {
  plenty: "충분",
  some: "보통",
  few: "부족",
  empty: "없음",
  break: "판매중지"
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
