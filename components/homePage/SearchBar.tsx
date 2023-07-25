"use client";

import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface SearchBarProps {
  setFilterParam: any;
}

const SearchBar: React.FC<SearchBarProps> = ({ setFilterParam }) => {
  const [textValue, setTextValue] = useState("");

  return (
    <div className="w-5/6 flex p-2 rounded-md overflow-hidden bg-white border-2 border-neutral-300">
      <FaMagnifyingGlass size={24} className="pr-2 text-neutral-400" />
      <input
        type="text"
        placeholder="Search a title, author, description, or URL"
        value={textValue}
        onChange={(event) => {
          setTextValue(event.target.value);
          setFilterParam(event.target.value.toLowerCase());
        }}
        className="w-full focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
