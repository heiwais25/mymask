import { IRemainStat } from "./hooks/useFetchStores";
export const STORE_LIST_DIALOG = "#STORE_LIST_DIALOG";
export const STORE_DETAIL_DIALOG = "#STORE_DETAIL_DIALOG";
export const SEARCH_DIALOG = "#SEARCH_DIALOG";

export const TIME_INTERVAL = 2; // in minute
export const FETCH_DISTANCE = 1500; // in minute

export const DIALOG_CHECK_TOKEN = "v0.0.3/dialog-check";
export const DIALOG_CHECK_KEY = "dialog-check-key";

export const statusString: { [key in IRemainStat]: string } = {
  plenty: "충분",
  some: "보통",
  few: "부족",
  empty: "없음"
};

export type IMarkerColor = "green" | "yellow" | "red" | "grey";

export const statueColor: { [key in IRemainStat]: IMarkerColor } = {
  plenty: "green",
  some: "yellow",
  few: "red",
  empty: "grey"
};
