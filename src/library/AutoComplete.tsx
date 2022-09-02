import React from "react";
import "./autocomplete.css";

type ItemList = {
  label: string;
  value: string;
};

type Props = {
  list: ItemList[];
  value: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder: string;
  label: string;
  listName: string;
};

const AutoComplete = ({
  list,
  value,
  onSearch,
  placeholder,
  label,
  name,
  listName,
}: Props) => {
  return (
    <div className="autocomplete-container">
      <label htmlFor={label}>{label}</label>
      <input
        type="text"
        id={name}
        placeholder={placeholder}
        list={listName}
        className={"input-search"}
      />
      <datalist id={listName}>
        {list.map((item) => (
          <option value={item.value} key={item.value}>
            {item.label}
          </option>
        ))}
      </datalist>
    </div>
  );
};
export default AutoComplete;
