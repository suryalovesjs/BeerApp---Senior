import { searchBeerList } from "../../api";
import { Beer } from "../../types";
import { getItem } from "../../utils";
import handle from "../../utils/error";

const fetchSavedItems = (setData: (data: Array<Beer>) => void) => {
  (async () => {
    try {
      const data = getItem("favorites") as Beer[];
      setData(data);
    } catch (error) {
      handle(error);
    }
  })();
};

export { fetchSavedItems };
