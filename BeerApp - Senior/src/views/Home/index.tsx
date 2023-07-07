import { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Beer } from "../../types";
import { useNavigate } from "react-router-dom";
import { Paper, Grid, Typography } from "@mui/material";
import Banner from "../../components/Banner";
import BeerListItem from "../../components/BeerListItem";
import { RootState } from "../../store";
import { fetchFavoriteBeers, updateFavoriteBeers } from "../../store/actions";

const mapState = (state: RootState) => ({
  favorites: state.beer.favorites,
});

const mapDispatch = {
  fetchFavoriteBeers,
  updateFavoriteBeers,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Home: React.FC<PropsFromRedux> = ({
  favorites,
  fetchFavoriteBeers,
  updateFavoriteBeers,
}) => {
  // const [savedList, setSavedList] = useState<Array<Beer>>([]);

  const navigate = useNavigate();

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  useEffect(() => {
    fetchFavoriteBeers();
  }, []);

  const toggleFavorite = (
    event: React.MouseEvent<Element, MouseEvent>,
    id: string
  ) => {
    event.stopPropagation();

    const beer = favorites.find((beer: Beer) => beer.id === id);

    if (beer) {
      if (favorites.find((favBeer: Beer) => favBeer.id === id)) {
        updateFavoriteBeers(
          favorites.filter((favBeer: Beer) => favBeer.id !== id)
        );
      } else {
        updateFavoriteBeers([...favorites, beer]);
      }
    }
  };

  return (
    <>
      <Banner large />
      <Grid container spacing={2} padding={2} alignItems="center">
        <Grid item xs={12}>
          <Paper>
            <Grid container spacing={2} padding={2} alignItems="center">
              {favorites.length ? (
                <Grid item xs={12} alignContent="center">
                  <Typography fontSize="large">Your Favourites</Typography>
                </Grid>
              ) : (
                <Grid container>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: "50px",
                      fontWeight: "100",
                      margin: "auto",
                    }}
                  >
                    Tap into the flavor paradise! Discover and save your
                    favorite beers now!
                  </Typography>
                </Grid>
              )}
              {favorites.map((beer: Beer) => (
                <Grid item key={beer.id} xs={12} sm={6} md={4} lg={6}>
                  <BeerListItem
                    beer={beer}
                    favorites={favorites}
                    onBeerClick={onBeerClick}
                    toggleFavorite={toggleFavorite}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default connector(Home);
