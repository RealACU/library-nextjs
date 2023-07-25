"use client";

import SearchBar from "../SearchBar";
import LibraryRenderedContent from "./LibraryRenderedContent";
import { renderedItem } from "@/types/renderedItem";
import { useState } from "react";
import { BsGrid, BsListUl } from "react-icons/bs";
import Cookies from "js-cookie";
import { SafeUser } from "@/types/safeUser";

interface LibraryProps {
  currentUser: SafeUser | null;
  itemsList: renderedItem[];
}

const Library: React.FC<LibraryProps> = ({ currentUser, itemsList }) => {
  if (currentUser) {
    Cookies.set("visited", "true", { expires: 3650, path: "" });
  }

  const [isGridView, setIsGridView] = useState(true);
  const [filterParam, setFilterParam] = useState();

  return (
    <section className="w-full sm:w-3/4 flex flex-col p-4 gap-1 overflow-y-scroll hide-scrollbar bg-neutral-100">
      <header className="w-full flex">
        <SearchBar setFilterParam={setFilterParam} />
        <div className="w-1/6 flex justify-center items-center">
          <button
            onClick={() => setIsGridView(!isGridView)}
            className="flex p-1 gap-1"
          >
            <BsGrid size={24} />
            <BsListUl size={24} />
          </button>
        </div>
      </header>
      <LibraryRenderedContent
        itemsList={itemsList}
        isGridView={isGridView}
        filterParam={filterParam}
        currentUser={currentUser}
      />
    </section>
  );
};

export default Library;
