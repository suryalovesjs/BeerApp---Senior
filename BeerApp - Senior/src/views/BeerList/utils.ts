import { getBeerList, getBeerMetaData, searchBeerList } from "../../api";
import { ApiParams, Beer } from "../../types";
import handle from "../../utils/error";

const fetchBeerList = (
  setData: (data: Array<Beer>) => void,
  params: ApiParams
) => {
  (async () => {
    try {
      const response = await getBeerList(params || {});
      setData(response.data);
    } catch (error) {
      handle(error);
    }
  })();
};

const fetchMeta = (setData: (data: number) => void, params: ApiParams) => {
  (async () => {
    try {
      const response = await getBeerMetaData(params || {});
      setData(response.data.total);
    } catch (error) {
      handle(error);
    }
  })();
};

export { fetchBeerList, fetchMeta };
