import React, { useEffect, useState } from "react";
import "./App.css";
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  //this is for fetching data at first after the component loads
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  // this is for individual country

  //API: https://disease.sh/v3/covid-19/countries

  useEffect(() => {
    // async -> send a request to a server, wait for it, do something with input

    // ==============This is for the dropdown list============
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // United States, United Kingdom, India
            value: country.countryInfo.iso2, //UK, USA, IN
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);

          //setCountries is used for fetching all data and draw circles on the map
          setMapCountries(data);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  // ==========This is for all country triggered values==============

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    // console.log(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);

        //All the data from the country response
        setCountryInfo(data);

        // console.log(data);

        //To go wherever I want in map....
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });

    //API: https://disease.sh/v3/covid-19/all
    //API: https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
  };

  // console.log(countryInfo);

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>CoronaVirus-19 Tracker</h1>
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
          <InfoBox
            isOrange
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={countryInfo.cases}
          />
          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={countryInfo.recovered}
          />
          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={countryInfo.deaths}
          />
        </div>

        {/* Map */}
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live Cases By Country</h3>
          {/* Table */}
          <Table countries={tableData} />
          <hr />
          <br />
          <h3>Worldwide New {casesType}</h3>
          <hr />
          <br />
          {/* Graph */}
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
