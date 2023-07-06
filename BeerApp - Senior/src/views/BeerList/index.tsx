import { useEffect, useState } from "react";
import { Beer, SORT, TYPE } from "../../types";
import { fetchBeerList, fetchMeta } from "./utils";
import { Grid, Pagination, SelectChangeEvent, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import BeerListItem from "../../components/BeerListItem";
import { getItem, setItem } from "../../utils";
import Banner from "../../components/Banner";
import BeerListControls from "./BeerListControls";

interface PageMeta {
  page: number;
  type?: TYPE;
  sort?: SORT;
  name?: string;
}

const BeerList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [totalList, setTotalList] = useState<number>(1);
  const [currentPageMeta, setCurrentPageMeta] = useState<PageMeta>({
    page: 1,
  });
  const [itemsPerPage] = useState(20);
  const [filterType, setFilterType] = useState<TYPE | undefined>();
  const [sortType, setSortType] = useState<SORT | undefined>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [favorites, setFavorites] = useState<Beer[]>(() => {
    return getItem("favorites") || [];
  });
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );
  const debounceDelay = 300;

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const type = searchParams.get("type") as TYPE;
    const sort = searchParams.get("sort") as SORT;
    const name = searchParams.get("name") as string;

    if (type) {
      setFilterType(type);
    }

    if (sort) {
      setSortType(sort);
    }

    if (name) {
      setSearchValue(name);
    }
    setCurrentPageMeta({
      page,
      type,
      sort,
      name,
    });
  }, [location.search]);

  useEffect(() => {
    const params = {
      page: currentPageMeta.page,
      per_page: 20,
      ...(currentPageMeta.name
        ? { sort: `type,name:${currentPageMeta.sort}` }
        : {}),
      ...(currentPageMeta.type ? { by_type: currentPageMeta.type } : {}),
      ...(currentPageMeta.name ? { by_name: currentPageMeta.name } : {}),
    };

    fetchBeerList(setBeerList, params);
    fetchMeta(setTotalList, params);
  }, [currentPageMeta]);

  useEffect(() => {
    setItem("favorites", favorites);
  }, [favorites]);

  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  const toggleFavorite = (
    event: React.MouseEvent<Element, MouseEvent>,
    id: string
  ) => {
    event.stopPropagation();
    const beer = beerList.find((beer) => beer.id === id);

    if (beer) {
      if (favorites.find((favBeer) => favBeer.id === id)) {
        setFavorites(favorites.filter((favBeer) => favBeer.id !== id));
      } else {
        setFavorites([...favorites, beer]);
      }
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", String(value));
    navigate(`?${searchParams.toString()}`);
  };

  const handleFilterChange = (event: SelectChangeEvent<TYPE>) => {
    const newFilterType = event.target.value as TYPE;
    setFilterType(newFilterType);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("type", newFilterType);
    navigate(`?${searchParams.toString()}`);
  };

  const handleSortChange = (event: SelectChangeEvent<SORT>) => {
    const newSortType = event.target.value as SORT;
    setSortType(newSortType);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("sort", newSortType);
    navigate(`?${searchParams.toString()}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timer = setTimeout(() => {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("name", searchValue);
      navigate(`?${searchParams.toString()}`);
    }, debounceDelay);

    setDebounceTimer(timer);
  };

  return (
    <>
      <Banner small />
      <Grid container spacing={2} padding={2} alignItems="center">
        <BeerListControls
          handleFilterChange={handleFilterChange}
          handleSortChange={handleSortChange}
          handleSearchChange={handleSearchChange}
          searchValue={searchValue}
          filterType={filterType}
          sortType={sortType}
        />
        {!beerList.length && (
          <Typography variant="h3" textAlign="center">
            No Beers found!
          </Typography>
        )}
        {beerList.map((beer) => (
          <Grid item key={beer.id} xs={12} sm={6} md={4} lg={3}>
            <BeerListItem
              beer={beer}
              favorites={favorites}
              onBeerClick={onBeerClick}
              toggleFavorite={toggleFavorite}
            />
          </Grid>
        ))}

        <Grid item xs={12} container justifyContent="center">
          <Pagination
            count={Math.ceil(totalList / itemsPerPage)}
            page={currentPageMeta.page}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default BeerList;
