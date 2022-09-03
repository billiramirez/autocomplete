import React, { useEffect, useRef, useState } from "react";
import { searchCountryByName } from "./api/apiClient";
import "./App.css";
import AutoComplete from "./library/AutoComplete";
import { Country } from "./types/Countries";

function App() {
  const [debounceTerm, setDebounceTerm] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [matchCountries, setMatchCountries] = useState<Country[]>([]);
  const debouceTimer = useRef<number | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  useEffect(() => {
    searchCountryByName("").then((countries) => setCountries(countries));
  }, []);

  useEffect(() => {
    if (!searchText.length) {
      return;
    }
    /**
     * Let's hit the API to search by text, leverage that logic to the api
     */
    const foundCountries = countries.filter((country) =>
      country.label
        .trim()
        .toLocaleLowerCase()
        .includes(searchText.trim().toLocaleLowerCase())
    );
    setMatchCountries(foundCountries);
  }, [searchText, countries]);

  /**
   * Use throtling strategy to avoid unnecessary hits to the api and improving performance
   */

  useEffect(() => {
    debouceTimer.current = window.setTimeout(() => {
      setSearchText(debounceTerm);
    }, 500);

    return () => {
      if (debouceTimer.current) {
        window.clearTimeout(debouceTimer.current);
      }
    };
  }, [debounceTerm]);

  const onSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebounceTerm(e.target.value);
  };

  const onSelect = (value: string | null) => {
    setSelectedCountry(null);
    setSelectedCountry(value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1> AutoComplete Component</h1>
      </header>
      <div className="main-box">
        <h3>Search the Country You Want to Hire</h3>
        <AutoComplete
          list={matchCountries}
          value={debounceTerm}
          onSearch={onSearchText}
          name={"countries-search"}
          placeholder={"Type in the name of the country"}
          label={"Search Countries"}
          listName={"countries"}
          onReset={() => setDebounceTerm("")}
          onSelect={onSelect}
          selected={selectedCountry}
        />
      </div>
    </div>
  );
}

export default App;
