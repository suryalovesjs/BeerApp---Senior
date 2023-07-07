import { Beer } from "../types";

export interface BeerState {
  beerList: Beer[];
  totalList: number;
  favorites: Beer[];
  beerData: Record<string, Beer>;
}

// Actions
interface SetBeerListAction {
  type: "SET_BEER_LIST";
  payload: Beer[];
}

interface SetTotalListAction {
  type: "SET_TOTAL_LIST";
  payload: number;
}

interface SetFavoritesAction {
  type: "SET_FAVORITES";
  payload: Beer[];
}

interface SetBeerDataAction {
  type: "SET_BEER_DATA";
  payload: {
    id: string;
    beer: Beer;
  };
}

export type BeerAction =
  | SetBeerListAction
  | SetTotalListAction
  | SetFavoritesAction
  | SetBeerDataAction;

export type BeerActionType = BeerAction & {
  type: string;
};
