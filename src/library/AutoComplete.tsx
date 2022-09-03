import React, { useEffect, useRef, useState } from "react";
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
  const [entries, setEntries] = useState<string[]>([]);
  const itemsRef = useRef<Map<string, HTMLElement> | null>(null);

  useEffect(() => {
    const entries = list.map((listItem) => listItem.label);
    setEntries(entries);
    setActiveMatchIdx(null);
    setActiveToHover(null);
  }, [list]);

  function scrollToLabel(label: string) {
    const map = getMap();
    const node = map.get(label);
    if (node) {
      node.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }

  function getMap(): Map<string, HTMLElement> {
    if (!itemsRef.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map<string, HTMLElement>();
    }
    return itemsRef.current;
  }

  const handleESCKey = () => {
    onReset();
    onSelect(null);
    setActiveMatchIdx(null);
    setActiveToHover(null);
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
      scrollToLabel(entries[0]);
    } else if (activeMatchIdx !== entries.length - 1) {
      if (activeMatchIdx !== null) {
        const currentIdx = activeMatchIdx + 1;
        setActiveMatchIdx(currentIdx);
        setActiveToHover(entries[currentIdx]);
        scrollToLabel(entries[currentIdx]);
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
      scrollToLabel(entries[idx]);
    } else if (activeMatchIdx !== 0) {
      const idx = activeMatchIdx - 1;
      setActiveMatchIdx(idx);
      setActiveToHover(entries[idx]);
      scrollToLabel(entries[idx]);
    }
  };

  const handleKeyChanges = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;

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

  const createHtml = (html: string) => {
    return {
      __html: html,
    };
  };

  const optionValue = (
    textToHighlight: string,
    optionValue: string
  ): { __html: string } => {
    const matchText = optionValue.replace(
      new RegExp(textToHighlight, "gi"),
      (match) => `<mark>${match}</mark>`
    );
    return createHtml(matchText);
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
          onSelect(null);
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
                ref={(node) => {
                  const map = getMap();
                  if (node) {
                    map.set(item.label, node);
                  } else {
                    map.delete(item.label);
                  }
                }}
                value={item.label}
                key={item.value}
                className={
                  activeToHover && activeToHover === item.label
                    ? "active-match"
                    : "match"
                }
                onClick={(e) => onSelect(item.label)}
                dangerouslySetInnerHTML={optionValue(value, item.label)}
              />
            );
          })}
          {value && !list.length && <p>No Result Found!</p>}
        </datalist>
      )}
    </div>
  );
};

export default AutoComplete;
