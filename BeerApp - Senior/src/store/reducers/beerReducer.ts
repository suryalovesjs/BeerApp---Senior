import { BeerActionType, BeerState } from "../types";

const initialState: BeerState = {
  beerList: [],
  totalList: 1,
  favorites: [],
  beerData: {},
};

export const beerReducer = (
  state = initialState,
  action: BeerActionType
): BeerState => {
  switch (action.type) {
    case "SET_BEER_LIST":
      return {
        ...state,
        beerList: action.payload,
      };
    case "SET_TOTAL_LIST":
      return {
        ...state,
        totalList: action.payload,
      };
    case "SET_FAVORITES":
      return {
        ...state,
        favorites: action.payload,
      };
    case "SET_BEER_DATA": {
      const { id, beer } = action.payload;
      return {
        ...state,
        beerData: {
          ...state.beerData,
          [id]: beer,
        },
      };
    }
    default:
      return state;
  }
};
