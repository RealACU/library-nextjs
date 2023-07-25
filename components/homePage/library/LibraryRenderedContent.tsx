"use client";

import LibraryItem from "./LibraryItem";
import { renderedItem } from "@/types/renderedItem";
import CreateItem from "./CreateItem";
import { SafeUser } from "@/types/safeUser";

interface LibraryRenderedContentProps {
  itemsList: renderedItem[];
  isGridView: boolean;
  filterParam?: string;
  currentUser: SafeUser | null;
}

const LibraryRenderedContent: React.FC<LibraryRenderedContentProps> = ({
  itemsList,
  isGridView,
  filterParam,
  currentUser,
}) => {
  function checkFilter(item: renderedItem, filterParam: string) {
    return (
      item.title.toLowerCase().includes(filterParam) ||
      item.author.toLowerCase().includes(filterParam) ||
      item.description?.toLowerCase().includes(filterParam) ||
      item.url.toLowerCase().includes(filterParam)
    );
  }

  if (filterParam) {
    itemsList.forEach((item: renderedItem) => {
      item.visible = checkFilter(item, filterParam);
    });
  } else {
    itemsList.forEach((item: renderedItem) => {
      item.visible = true;
    });
  }

  return (
    <div
      className={`pt-3 gap-2 transition ${
        isGridView
          ? "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
          : "flex flex-col"
      }`}
    >
      <CreateItem isGridView={isGridView} currentUser={currentUser} />
      {itemsList.map((item: renderedItem) => {
        if (item.visible) {
          return (
            <LibraryItem
              key={item.id}
              currentUsername={currentUser?.name}
              id={item.id}
              createdAt={item.createdAt}
              title={item.title}
              description={item.description}
              iconName={item.iconName}
              imageSrc={item.imageSrc}
              url={item.url}
              author={item.author}
              hashedPassword={item.hashedPassword}
              isGridView={isGridView}
            />
          );
        }
      })}
    </div>
  );
};

export default LibraryRenderedContent;
