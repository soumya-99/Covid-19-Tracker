import React, { useEffect, useState } from "react";
import "./App.css";
import { FormControl, MenuItem, Select, InputLabel } from "@material-ui/core";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

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

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    console.log(countryCode);

    setCountry(countryCode);
  };

  return (
    <div className="App">
      <div className="app__header">
        <h1>Covid-19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>

            {/* LOOP THROUGH ALL THE COUNTRIES AND SHOW A DROPDOWN LIST OF THE OPTIONS */}
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
              // value and name is the mapped value
            ))}

            {/* <MenuItem variant="worldwide">Worldwide</MenuItem>
            <MenuItem variant="worldwide">Option 2</MenuItem>
            <MenuItem variant="worldwide">Option 3</MenuItem>
            <MenuItem variant="worldwide">Option 4</MenuItem> */}
          </Select>
        </FormControl>
      </div>

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
