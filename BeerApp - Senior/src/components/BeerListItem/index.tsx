import { Favorite, FavoriteBorder, Language } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import { styled } from "@mui/system";
import { Beer } from "../../types";

const BeerCard = styled(Card)(({ theme }) => ({
  cursor: "pointer",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const BeerWebsiteLink = styled("a")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  color: theme.palette.primary.main,
  "&:hover": {
    textDecoration: "underline",
  },
}));

interface Props {
  beer: Beer;
  favorites: any;
  onBeerClick: (id: string) => void;
  toggleFavorite: (
    event: React.MouseEvent<Element, MouseEvent>,
    id: string
  ) => void;
}

const BeerListItem = (props: Props) => {
  const { beer, favorites, onBeerClick, toggleFavorite } = props;
  const isFavorite = favorites.some((favBeer: Beer) => favBeer.id === beer.id);

  const handleWebsiteLinkClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <Grid item key={beer.id}>
      <BeerCard variant="outlined" onClick={() => onBeerClick(beer.id)}>
        <CardContent>
          <Grid container direction="column" alignItems="center" spacing={1}>
            <Grid item>
              <Avatar>
                <SportsBarIcon />
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h6" align="center">
                {beer.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="textSecondary" align="center">
                {beer.brewery_type}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="textSecondary" align="center">
                {beer.country}
              </Typography>
            </Grid>
            <Grid item>
              <BeerWebsiteLink
                href={beer.website_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWebsiteLinkClick}
              >
                <Language sx={{ marginRight: "4px" }} />
                Visit Website
              </BeerWebsiteLink>
            </Grid>
            <Grid item>
              <IconButton
                onClick={(event) => toggleFavorite(event, beer.id)}
                color={isFavorite ? "primary" : "default"}
                sx={{ transition: "color 0.3s ease-in-out" }}
              >
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </BeerCard>
    </Grid>
  );
};

export default BeerListItem;
