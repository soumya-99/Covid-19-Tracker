import React, { useEffect, useState } from "react";
import "./App.css";
import { FormControl, MenuItem, Select } from "@material-ui/core";

function App() {
  const [countries, setCountries] = useState([]);

  //API: https://disease.sh/v3/covid-19/countries

  useEffect(() => {
    // async -> send a request to a server, wait for it, do something with input

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // United States, United Kingdom, India
            value: country.countryInfo.iso2, //UK, USA, IN
          }));

          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  return (
    <div className="App">
      <div className="app__header">
        <h1>Covid-19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="abc">
            {/* LOOP THROUGH ALL THE COUNTRIES AND SHOW A DROPDOWN LIST OF THE OPTIONS */}

            {countries.map((country) => (
              <MenuItem variant={country.value}>{country.name}</MenuItem> 
              // value and name is the mapped value
            ))}

            {/* <MenuItem variant="worldwide">Worldwide</MenuItem>
            <MenuItem variant="worldwide">Option 2</MenuItem>
            <MenuItem variant="worldwide">Option 3</MenuItem>
            <MenuItem variant="worldwide">Option 4</MenuItem> */}
          </Select>
        </FormControl>
      </div>

      {/* Header */}
      {/* Title + Select Input dropdown field */}

      {/* Info boxes */}
      {/* Info boxes */}
      {/* Info boxes */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
