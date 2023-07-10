import configureMockStore from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {
  fetchBeerList,
  fetchBeer,
  fetchMeta,
  fetchFavoriteBeers,
  updateFavoriteBeers,
  setBeerList,
  setTotalList,
  setFavorites,
  setBeerData,
} from "./beerAction";
import {
  getBeerList as fetchBeerListAPI,
  getBeer as getBeerAPI,
  getBeerMetaData as fetchMetaAPI,
  getFavoriteBeers as getFavoriteBeersAPI,
  updateFavoriteBeers as updateFavoriteBeersAPI,
} from "../../api";
import { Beer } from "../../types";

const middlewares = [thunk];
const mockStore = configureMockStore<{}, ThunkDispatch<{}, {}, AnyAction>>(
  middlewares
);

jest.mock("../../api", () => ({
  getBeerList: jest.fn(),
  getBeer: jest.fn(),
  getBeerMetaData: jest.fn(),
  getFavoriteBeers: jest.fn(),
  updateFavoriteBeers: jest.fn(),
}));

const mockBeerData: Beer = {
  id: "5128df48-79fc-4f0f-8b52-d06be54d0cec",
  name: "(405) Brewing Co",
  brewery_type: "micro",
  address_1: "1716 Topeka St",
  address_2: "",
  address_3: "",
  city: "Norman",
  state_province: "Oklahoma",
  postal_code: "73069-8224",
  country: "United States",
  longitude: "-97.46818222",
  latitude: "35.25738891",
  phone: "4058160490",
  website_url: "http://www.405brewing.com",
  state: "Oklahoma",
  street: "1716 Topeka St",
};
const mockBeerList: Array<Beer> = [mockBeerData];

const mockMeta = {
  total: 10,
};

const mockFavoriteBeers: Beer[] = [mockBeerList[0]];

describe("fetchBeerList", () => {
  it("should dispatch setBeerList with fetched beer list data", async () => {
    const params = {};
    const beerListData = { data: mockBeerList };
    (fetchBeerListAPI as jest.Mock).mockResolvedValue(beerListData);
    const expectedActions = [setBeerList(beerListData.data)];
    const store = mockStore({});

    await store.dispatch(fetchBeerList(params));

    expect(store.getActions()).toEqual(expectedActions);
    expect(fetchBeerListAPI).toHaveBeenCalledWith(params);
  });

  it("should handle error and log it", async () => {
    const params = {};
    const error = new Error("Failed to fetch beer list");
    (fetchBeerListAPI as jest.Mock).mockRejectedValue(error);

    const consoleErrorSpy = jest.spyOn(console, "error");
    consoleErrorSpy.mockImplementation(() => {});

    const store = mockStore({});

    await store.dispatch(fetchBeerList(params));

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error fetching beer list:",
      error
    );

    consoleErrorSpy.mockRestore();
  });
});

describe("fetchBeer", () => {
  it("should dispatch setBeerData with fetched beer info", async () => {
    const id = mockBeerData.id;
    const beerData = { data: mockBeerData };
    (getBeerAPI as jest.Mock).mockResolvedValue(beerData);
    const expectedActions = [setBeerData(id, beerData.data)];
    const store = mockStore({});

    await store.dispatch(fetchBeer(id));

    expect(store.getActions()).toEqual(expectedActions);
    expect(getBeerAPI).toHaveBeenCalledWith(id);
  });

  it("should handle error and log it", async () => {
    const id = mockBeerData.id;
    const error = new Error("Failed to fetch beer info");
    (getBeerAPI as jest.Mock).mockRejectedValue(error);

    const consoleErrorSpy = jest.spyOn(console, "error");
    consoleErrorSpy.mockImplementation(() => {});

    const store = mockStore({});

    await store.dispatch(fetchBeer(id));

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error fetching beer info:",
      error
    );

    consoleErrorSpy.mockRestore();
  });
});

describe("fetchMeta", () => {
  it("should dispatch setTotalList with fetched total list", async () => {
    const params = {};
    const meta = { data: mockMeta };
    (fetchMetaAPI as jest.Mock).mockResolvedValue(meta);
    const expectedActions = [setTotalList(meta.data.total)];
    const store = mockStore({});

    await store.dispatch(fetchMeta(params));

    expect(store.getActions()).toEqual(expectedActions);
    expect(fetchMetaAPI).toHaveBeenCalledWith(params);
  });

  it("should handle error and log it", async () => {
    const params = {};
    const error = new Error("Failed to fetch meta");
    (fetchMetaAPI as jest.Mock).mockRejectedValue(error);

    const consoleErrorSpy = jest.spyOn(console, "error");
    consoleErrorSpy.mockImplementation(() => {});

    const store = mockStore({});

    await store.dispatch(fetchMeta(params));

    expect(consoleErrorSpy).toHaveBeenCalledWith("Error fetching meta:", error);

    consoleErrorSpy.mockRestore();
  });
});
