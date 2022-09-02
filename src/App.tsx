import React, { useEffect, useRef, useState } from "react";
import { searchCountryByName } from "./api/apiClient";
import "./App.css";
import AutoComplete from "./library/AutoComplete";
import { Country } from "./types/Countries";

function App() {
  const [debounceTerm, setDebounceTerm] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>([]);
  const debouceTimer = useRef<number | null>(null);

  useEffect(() => {
    searchCountryByName(searchText).then((countries) =>
      setCountries(countries)
    );
  }, [searchText]);

  /**
   * Use throtling strategy to avoid unnecessary hits to the api
   */

  useEffect(() => {
    debouceTimer.current = window.setInterval(() => {
      setSearchText(debounceTerm);
    }, 500);

    return () => {
      if (debouceTimer.current) {
        window.clearInterval(debouceTimer.current);
      }
    };
  }, [debounceTerm]);

  const onSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebounceTerm(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1> AutoComplete Component</h1>
      </header>
      <div className="main-box">
        <h3>Search the Country You Want to Hire</h3>
        <AutoComplete
          list={countries}
          value={debounceTerm}
          onSearch={onSearchText}
          name={"countries-search"}
          placeholder={"Test this"}
          label={"Search Countries"}
          listName={"countries"}
        />
      </div>
    </div>
  );
}

export default App;
