"use client";

import LibraryItem from "./library/LibraryItem";
import { recentsListItem } from "@/types/recentsListItem";
import { useState, useEffect } from "react";
import { BsTrash } from "react-icons/bs";

const Sidebar = () => {
  const [recentsList, setRecentsList] = useState<recentsListItem[]>([]);

  useEffect(() => {
    setRecentsList(JSON.parse(localStorage.getItem("recents") || "[]"));
  }, []);

  return (
    <section className="h-full w-1/4 hidden sm:flex flex-col p-4 gap-4 bg-neutral-50">
      <div className="h-[7%] w-full grid grid-cols-2 items-center">
        <p>Recent</p>
        <div className="flex justify-end">
          <button
            onClick={() => {
              localStorage.setItem("recents", "[]");
              setRecentsList([]);
            }}
            className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-neutral-500/30"
          >
            <BsTrash />
          </button>
        </div>
      </div>
      <div className="h-[93%] flex flex-col gap-2 overflow-y-scroll hide-scrollbar">
        {recentsList.map((item: recentsListItem) => {
          return (
            <LibraryItem
              key={item.id}
              id={item.id}
              title={item.title}
              description=""
              iconName={item.iconName}
              imageSrc=""
              url={item.url}
              author=""
              hashedPassword=""
              isGridView={false}
              currentUsername="1" // So that delete button does not appear
            />
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
