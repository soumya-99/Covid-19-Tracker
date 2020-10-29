import React, { useEffect, useState } from "react";
import "./App.css";
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";

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
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
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

        <div className="app__stats">
          {/* InfoBoxes title="Coronavirus Cases" */}
          {/* InfoBoxes title="Coronavirus Recoveries" */}
          {/* InfoBoxes title="Coronavirus Deaths" */}
          <InfoBox title="Coronavirus Cases" cases={12345} total={2000} />
          <InfoBox title="Recovered" cases={1234} total={5000} />
          <InfoBox title="Deaths" cases={123} total={100} />
        </div>

        {/* Map */}
        <Map />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live Cases By Country</h3>
          {/* Table */}
          <h3>Worldwide New Cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
