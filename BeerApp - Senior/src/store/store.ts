import {
  createStore,
  applyMiddleware,
  combineReducers,
  AnyAction,
} from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { beerReducer } from "./reducers/beerReducer";
import { BeerState } from "./types";

export interface RootState {
  beer: BeerState;
}

const rootReducer = combineReducers({
  beer: beerReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;
