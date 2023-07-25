import { create } from "zustand";

interface OpenLinkModalStore {
  isOpen: boolean;
  hashedPassword: string;
  id: string;
  title: string;
  iconName: string;
  url: string;
  open: (
    hashedPassword: string,
    id: string,
    title: string,
    iconName: string,
    url: string
  ) => void;
  close: () => void;
}

const useOpenLinkModal = create<OpenLinkModalStore>((set) => ({
  isOpen: false,
  hashedPassword: "",
  id: "",
  title: "",
  iconName: "",
  url: "",
  open: (hashedPassword, id, title, iconName, url) =>
    set({ isOpen: true, hashedPassword, id, title, iconName, url }),
  close: () => set({ isOpen: false }),
}));

export default useOpenLinkModal;
