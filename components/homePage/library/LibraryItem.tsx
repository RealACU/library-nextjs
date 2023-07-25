"use client";

import Image from "next/image";
import DynamicIcon from "../DynamicIcon";
import library_placeholder_image from "@/public/library_placeholder_image.jpg";
import useOpenLinkModal from "@/hooks/useOpenLinkModal";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import saveToRecents from "@/actions/saveToRecents";
import { isCuid } from "@paralleldrive/cuid2";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";

interface LibraryItemProps {
  currentUsername?: string;
  id: string;
  createdAt?: string;
  title: string;
  description: string;
  iconName: string;
  imageSrc: string;
  url: string;
  author: string;
  hashedPassword: string;
  isGridView: boolean;
}

const LibraryItem: React.FC<LibraryItemProps> = ({
  currentUsername,
  id,
  createdAt,
  title,
  description,
  iconName,
  imageSrc,
  url,
  author,
  hashedPassword,
  isGridView,
}) => {
  const router = useRouter();
  const openLinkModal = useOpenLinkModal();

  if (createdAt) {
    createdAt = createdAt.slice(0, createdAt.indexOf("T"));
  }

  function onOpen() {
    if (hashedPassword && isCuid(Cookies.get(id) || "")) {
      hashedPassword = "";
    }

    if (hashedPassword || url.startsWith("http")) {
      return openLinkModal.open(hashedPassword, id, title, iconName, url);
    }

    router.push(url);
    saveToRecents({ id, title, iconName, url });
  }

  function onDelete() {
    axios
      .delete(`/api/item/${id}`)
      .then(() => router.refresh())
      .catch((error) => console.error(error));
  }

  if (!isGridView) {
    return (
      <section className="relative">
        <div
          onClick={onOpen}
          className="w-full relative p-2 rounded-lg shadow-xl overflow-x-scroll hide-scrollbar bg-primary-color hover:opacity-80 transition cursor-pointer"
        >
          <div className="w-[95%] flex overflow-hidden gap-2 items-center">
            <DynamicIcon
              iconName={iconName}
              size={22}
              className="flex flex-shrink-0 text-white"
            />
            <p className="text-white">{title}</p>
            <p className="text-sm pl-2 text-white border-l-white border-l-2">
              {author}
            </p>
            {createdAt && (
              <p className="text-sm text-white italic">{createdAt}</p>
            )}
            {description && (
              <p className="text-xs pl-2 text-white border-l-white border-l-2">
                {description}
              </p>
            )}
          </div>
        </div>
        {currentUsername === author && (
          <div className="h-8 w-8 rounded-full flex justify-center items-center absolute z-50 top-1 right-1 cursor-pointer hover:bg-neutral-500/30">
            <BsTrash size={18} onClick={onDelete} />
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="relative">
      <div
        onClick={onOpen}
        className="h-[15rem] w-full flex flex-col rounded-lg shadow-xl overflow-hidden bg-primary-color hover:opacity-80 transition cursor-pointer"
      >
        <div className="h-3/5 w-full relative">
          <Image
            src={imageSrc || library_placeholder_image}
            alt="Content"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="h-2/5 w-full relative flex flex-col p-2">
          <div className="flex text-white">
            <DynamicIcon iconName={iconName} size={22} />
            <p className="pl-1">{title}</p>
          </div>
          <div className="flex">
            <p className="text-sm text-white">{author}</p>
            <p className="text-sm pl-2 text-white italic">{createdAt}</p>
          </div>
          {description && (
            <p className="text-xs text-white overflow-x-scroll hide-scrollbar">
              {description}
            </p>
          )}
        </div>
      </div>
      {currentUsername === author && (
        <div className="h-6 w-6 rounded-full flex justify-center items-center absolute z-50 top-[calc(60%+0.5rem)] right-1 cursor-pointer hover:bg-neutral-500/30 text-white">
          <BsTrash size={18} onClick={onDelete} />
        </div>
      )}
    </section>
  );
};

export default LibraryItem;
