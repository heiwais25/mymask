import { IRemainStat } from "./hooks/useFetchStores";
export const STORE_LIST_DIALOG = "#STORE_LIST_DIALOG";
export const STORE_DETAIL_DIALOG = "#STORE_DETAIL_DIALOG";

export const TIME_INTERVAL = 2; // in minute
export const FETCH_DISTANCE = 1000; // in minute

export const DIALOG_CHECK_TOKEN = "v0.0.1/dialog-check";
export const DIALOG_CHECK_KEY = "dialog-check-key";

export const statusString: { [key in IRemainStat]: string } = {
  plenty: "충분",
  some: "보통",
  few: "부족",
  empty: "없음"
};
