import { SearchOutlined } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  InputAdornment,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { challengeFilters } from "../constants";
import Challenges from "./challenges";

const { Container } = require("@mui/system");

const ExploreChallenges = () => {
  const [filters, setFilters] = useState([]);
  const [filtersMapper, setFiltersMapper] = useState({});
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    const filterMapper = {};
    challengeFilters.forEach((category) => {
      category.filters.forEach((filter) => {
        filterMapper[filter.value] = false;
      });
    });
    setFiltersMapper(filterMapper);
  }, []);

  const onFilterSelect = (value) => {
    const filterMapper = { ...filtersMapper };
    const filtersCopy = [...filters];

    const index = filtersCopy.indexOf(value);
    if (index > -1) {
      filtersCopy.splice(index, 1);
    } else {
      filtersCopy.push(value);
    }
    filterMapper[value] = !filterMapper[value];
    setFilters(filtersCopy);
    setFiltersMapper(filterMapper);
  };

  return (
    <>
      <Container
        sx={{
          maxWidth: "100% !important",
          backgroundColor: "#002A3B",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "70px",
          paddingBottom: "70px",
        }}
      >
        <Typography color={"white"} variant="h5">
          Explore Challenges
        </Typography>
        <Box sx={{ display: "flex", marginTop: "60px" }}>
          <TextField
            placeholder="Search"
            onChange={(e) => setSearchField(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
            variant="standard"
            sx={{
              backgroundColor: "white",
              width: "500px",
              padding: "3px 20px",
              borderRadius: "12px",
              marginRight: "20px",
            }}
          />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            input={<OutlinedInput label="Filter" />}
            placeholder="Filter"
            onChange={(e) => {
              console.log(e);
            }}
            label="Filter"
            sx={{
              backgroundColor: "white",
              borderRadius: "12px",
              height: "40px",
              width: "150px",
            }}
          >
            {challengeFilters.map((category) => {
              return (
                <Box key={category.label} sx={{ padding: "5px 10px" }}>
                  <Typography>{category.label}</Typography>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    {category.filters.map((filter) => {
                      return (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Checkbox
                            onChange={(e) => onFilterSelect(e.target.value)}
                            key={filter.value}
                            value={filter.value}
                            checked={filters.includes(filter.value)}
                          />
                          {filter.label}
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              );
            })}
          </Select>
        </Box>
      </Container>
      <Challenges
        filters={filtersMapper}
        appliedFiltersCount={filters.length}
        nameSearch={searchField}
      />
    </>
  );
};

export default ExploreChallenges;
