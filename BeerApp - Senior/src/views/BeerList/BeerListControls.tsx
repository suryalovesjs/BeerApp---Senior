import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { SORT, TYPE } from "../../types";
import { BREWERY_TYPE } from "../../constants";

interface FilterProps {
  handleFilterChange: (event: SelectChangeEvent<TYPE>) => void;
  handleSortChange: (event: SelectChangeEvent<SORT>) => void;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterType: TYPE | undefined;
  sortType: SORT | undefined;
  searchValue: string;
}

const BeerListControls = ({
  handleFilterChange,
  handleSortChange,
  handleSearchChange,
  filterType,
  sortType,
  searchValue,
}: FilterProps) => {
  return (
    <>
      <Grid item xs={4}>
        <FormControl variant="outlined" fullWidth>
          <TextField
            label="Search"
            value={searchValue || ""}
            onChange={handleSearchChange}
          />
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Filter by Type</InputLabel>
          <Select value={filterType || ""} onChange={handleFilterChange}>
            <MenuItem value="">All</MenuItem>
            {BREWERY_TYPE.map((beerType: TYPE, index: number) => (
              <MenuItem key={index} value={beerType}>
                {beerType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Sort by</InputLabel>
          <Select value={sortType || ""} onChange={handleSortChange}>
            <MenuItem value="asc">Asc</MenuItem>
            <MenuItem value="desc">Desc</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </>
  );
};

export default BeerListControls;
