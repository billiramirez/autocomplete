import React, { useEffect } from "react";
import { searchCountryByName } from "./api/apiClient";
import "./App.css";
import AutoComplete from "./library/AutoComplete";

function App() {
  useEffect(() => {
    searchCountryByName("hello").then((countries) => console.log(countries));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1> AutoComplete Component</h1>
      </header>
      <div className="main-box">
        <h3>Search the Country You Want to Hire</h3>
        <AutoComplete
          list={[]}
          value={""}
          onSearch={(e: React.ChangeEvent<HTMLInputElement>) =>
            console.log(`value `, e.target.value)
          }
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
