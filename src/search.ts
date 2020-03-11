import { IPlace, IDocument, IStatus } from "./Components/KakaoMap/types";

export const searchPlacesAPI = async (ps: IPlace, term: string): Promise<IDocument[]> => {
  return new Promise((res, rej) => {
    ps.keywordSearch(term, (results: IDocument[], status: IStatus) => {
      if (status === "ERROR") {
        rej();
      } else {
        res(results);
      }
    });
  });
};
