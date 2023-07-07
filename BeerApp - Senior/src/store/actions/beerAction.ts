import { Dispatch } from "redux";
import { BeerActionType } from "../types";
import {
  getBeerList as fetchBeerListAPI,
  getBeer as getBeerAPI,
  getBeerMetaData as fetchMetaAPI,
  getFavoriteBeers as getFavoriteBeersAPI,
  updateFavoriteBeers as updateFavoriteBeersAPI,
} from "../../api";
import { Beer } from "../../types";

export const setBeerList = (beerList: Beer[]): BeerActionType => ({
  type: "SET_BEER_LIST",
  payload: beerList,
});

export const setTotalList = (totalList: number): BeerActionType => ({
  type: "SET_TOTAL_LIST",
  payload: totalList,
});

export const setFavorites = (favorites: Beer[]): BeerActionType => ({
  type: "SET_FAVORITES",
  payload: favorites,
});

export const setBeerData = (id: string, beer: Beer): BeerActionType => ({
  type: "SET_BEER_DATA",
  payload: {
    id,
    beer,
  },
});

export const fetchBeerList = (params: any) => {
  return async (dispatch: Dispatch<BeerActionType>) => {
    try {
      const beerList = await fetchBeerListAPI(params);
      dispatch(setBeerList(beerList.data));
    } catch (error) {
      console.error("Error fetching beer list:", error);
    }
  };
};

export const fetchBeer = (id: string) => {
  return async (dispatch: Dispatch<BeerActionType>) => {
    try {
      const beerInfo = await getBeerAPI(id);
      dispatch(setBeerData(id, beerInfo.data));
    } catch (error) {
      console.error("Error fetching beer info:", error);
    }
  };
};

export const fetchMeta = (params: any) => {
  return async (dispatch: Dispatch<BeerActionType>) => {
    try {
      const totalList = await fetchMetaAPI(params);
      dispatch(setTotalList(totalList.data.total));
    } catch (error) {
      console.error("Error fetching meta:", error);
    }
  };
};

export const fetchFavoriteBeers = () => {
  return async (dispatch: Dispatch<BeerActionType>) => {
    try {
      dispatch(setFavorites(getFavoriteBeersAPI()));
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };
};

export const updateFavoriteBeers = (favouriteBeers: Beer[]) => {
  return async (dispatch: Dispatch<BeerActionType>, getState: () => any) => {
    try {
      updateFavoriteBeersAPI(favouriteBeers);
      dispatch(setFavorites(favouriteBeers));
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };
};
