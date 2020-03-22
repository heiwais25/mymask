import _ from "lodash";

const hourMs = 3600 * 1e3;
const minMs = 60 * 1e3;

export const getFormattedTime = (ms: number) => {
  let ret = "";
  let curDuration = ms;
  if (curDuration > hourMs) {
    ret = `${_.toInteger(curDuration / hourMs)}시간`;
    curDuration = curDuration % hourMs;
  }
  if (curDuration > minMs) {
    ret = ret + ` ${_.toInteger(curDuration / minMs)}분`;
  }
  return ret;
};
