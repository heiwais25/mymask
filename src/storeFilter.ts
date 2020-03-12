import { IStore } from "./hooks/useFetchStores";

type IPartialStore = {
  name: string;
  addr: string;
  code: string;
};

const filterTargetCodes: { [key: string]: IPartialStore } = {
  "41833961": {
    code: "41833961",
    name: "경희한약국",
    addr: "경기도 부천시 경인로150번길 71, 101호 (송내동, 다올빌리지2차)"
  }
};

export const filterStores = (stores: IStore[]) => {
  return stores.filter(store => !filterTargetCodes[store.code]);
};
