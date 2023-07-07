const FAVORITES_KEY = "FAVORITES";
const getFavoriteBeers = () => {
  try {
    const item = localStorage.getItem(FAVORITES_KEY);
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.error(`Error retrieving item from local storage: ${error}`);
    return null;
  }
};

const updateFavoriteBeers = <T>(value: T): void => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(value));
  } catch (error) {
    console.error(`Error storing item in local storage: ${error}`);
  }
};

const removeAllFavoriteBeers = (): void => {
  try {
    localStorage.removeItem(FAVORITES_KEY);
  } catch (error) {
    console.error(`Error removing item from local storage: ${error}`);
  }
};

export { getFavoriteBeers, updateFavoriteBeers, removeAllFavoriteBeers };
