import React, { useMemo, useState } from "react";
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
  onReset: () => void;
  selected: string | null;
  onSelect: (item: string | null) => void;
};

enum Keys {
  ESC = "Escape",
  ARROW_DOWN = "ArrowDown",
  ARROW_UP = "ArrowUp",
  ENTER = "Enter",
}

const AutoComplete = ({
  list,
  value,
  onSearch,
  placeholder,
  label,
  name,
  listName,
  onReset,
  selected,
  onSelect,
}: Props) => {
  const [activeToHover, setActiveToHover] = useState<string | null>(null);
  const [activeMatchIdx, setActiveMatchIdx] = useState<number | null>(null);

  const entries = useMemo(() => {
    return list.map((listItem) => listItem.label);
  }, [list]);

  const handleESCKey = () => {
    onReset();
    onSelect(null);
  };

  const handleEnterKey = () => {
    if (!list.length || !activeToHover) {
      return;
    }
    onSelect(activeToHover);
  };

  const handleArrowDownKey = () => {
    if (!list.length) {
      return;
    } else if (
      activeMatchIdx === null ||
      activeMatchIdx === entries.length - 1
    ) {
      setActiveMatchIdx(0);
      setActiveToHover(entries[0]);
    } else if (activeMatchIdx !== entries.length - 1) {
      if (activeMatchIdx !== null) {
        const currentIdx = activeMatchIdx + 1;
        setActiveMatchIdx(currentIdx);
        setActiveToHover(entries[currentIdx]);
      }
    }
  };

  const handleArrowUpKey = () => {
    if (!list.length) {
      return;
    } else if (activeMatchIdx === null || activeMatchIdx === 0) {
      const idx = entries.length - 1;
      setActiveMatchIdx(idx);
      setActiveToHover(entries[idx]);
    } else if (activeMatchIdx !== 0) {
      const idx = activeMatchIdx - 1;
      setActiveMatchIdx(idx);
      setActiveToHover(entries[idx]);
    }
  };

  const handleKeyChanges = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;
    if (!entries.length) {
      return;
    }

    switch (key) {
      case Keys.ESC:
        handleESCKey();
        break;

      case Keys.ENTER:
        handleEnterKey();
        break;

      case Keys.ARROW_DOWN:
        handleArrowDownKey();
        break;

      case Keys.ARROW_UP:
        handleArrowUpKey();
        break;
    }
  };

  return (
    <div className="autocomplete-container">
      <label htmlFor={listName}>{label}</label>
      <input
        type="text"
        id={name}
        placeholder={placeholder}
        list={""}
        className={"input-search"}
        onChange={(e) => {
          onSearch(e);
        }}
        onKeyDown={handleKeyChanges}
        onFocus={(e) => {
          onSearch(e);
        }}
        autoComplete="off"
        name={listName}
        value={selected ?? value}
      />
      {value && !selected && (
        <datalist id={listName} className="data-list">
          {list.map((item) => {
            return (
              <option
                value={item.label}
                key={item.value}
                className={
                  activeToHover && activeToHover === item.label
                    ? "active-match"
                    : ""
                }
              >
                {item.label}
              </option>
            );
          })}
          {value && !list.length && <p>No Result Found!</p>}
        </datalist>
      )}
    </div>
  );
};
export default AutoComplete;
