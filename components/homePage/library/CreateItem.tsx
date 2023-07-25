"use client";

import { useCallback } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import useAddItemModal from "@/hooks/useAddItemModal";
import Cookies from "js-cookie";
import { SafeUser } from "@/types/safeUser";

interface CreateItemProps {
  isGridView: boolean;
  currentUser: SafeUser | null;
}

const CreateItem: React.FC<CreateItemProps> = ({ isGridView, currentUser }) => {
  const addItemModal = useAddItemModal();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const visited = Cookies.get("visited");

  const onCreate = useCallback(() => {
    if (!visited) {
      return registerModal.open();
    }

    if (!currentUser) {
      return loginModal.open();
    }

    addItemModal.open();
  }, [visited, currentUser, registerModal, loginModal, addItemModal]);

  if (!isGridView) {
    return (
      <button
        onClick={onCreate}
        className="w-full flex p-2 gap-2 items-center border-dashed border-2 border-neutral-600 hover:bg-neutral-300 rounded-lg cursor-pointer disabled:cursor-not-allowed"
      >
        <AiOutlinePlusCircle />
        <p>Create New</p>
      </button>
    );
  }

  return (
    <button
      onClick={onCreate}
      className="h-[15rem] w-full flex flex-col justify-center items-center border-dashed border-2 border-neutral-600 hover:bg-neutral-300 rounded-lg cursor-pointer disabled:cursor-not-allowed"
    >
      <AiOutlinePlusCircle />
      <p>Create New</p>
    </button>
  );
};

export default CreateItem;
