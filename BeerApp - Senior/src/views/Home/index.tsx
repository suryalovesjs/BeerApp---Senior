import { useEffect, useState } from "react";
import { fetchSavedItems } from "./utils";
import { Beer } from "../../types";
import { useNavigate } from "react-router-dom";
import { Paper, Grid, Typography } from "@mui/material";
import Banner from "../../components/Banner";
import BeerListItem from "../../components/BeerListItem";

const Home = () => {
  const [savedList, setSavedList] = useState<Array<Beer>>([]);

  const navigate = useNavigate();

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  useEffect(() => {
    fetchSavedItems(setSavedList);
  }, []);

  const toggleFavorite = (
    event: React.MouseEvent<Element, MouseEvent>,
    id: string
  ) => {
    event.stopPropagation();

    const beer = savedList.find((beer) => beer.id === id);

    if (beer) {
      if (savedList.find((favBeer) => favBeer.id === id)) {
        setSavedList(savedList.filter((favBeer) => favBeer.id !== id));
      } else {
        setSavedList([...savedList, beer]);
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
              {savedList.length ? (
                <Grid item xs={12} alignContent="center">
                  <Typography fontSize="large">Your Favourites</Typography>
                </Grid>
              ) : (
                <Grid container xs={12}>
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
              {savedList.map((beer) => (
                <Grid item xs={12} sm={6} md={4} lg={6}>
                  <BeerListItem
                    key={beer.id}
                    beer={beer}
                    favorites={savedList}
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

export default Home;
