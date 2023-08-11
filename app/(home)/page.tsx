import HeroSection from "@/components/homePage/HeroSection";
import Library from "@/components/homePage/library/Library";
import Sidebar from "@/components/homePage/Sidebar";
import getCurrentUser from "@/actions/getCurrentUser";
import RegisterModal from "@/components/homePage/RegisterModal";
import LoginModal from "@/components/homePage/LoginModal";
import getItems from "@/actions/getItems";
import { renderedItem } from "@/types/renderedItem";
import AddItemModal from "@/components/homePage/library/AddItemModal";
import OpenLinkModal from "@/components/homePage/library/OpenLinkModal";

export default async function Home() {
  const currentUser = await getCurrentUser();

  const serverItemsList: renderedItem[] = await getItems();
  const defaultItemsList: renderedItem[] = [
    {
      id: "devitem1",
      title: "Paraphrase",
      description: "AI Demonstration",
      iconName: "Controller",
      imageSrc:
        "https://res.cloudinary.com/dtdiarww5/image/upload/v1689882159/xe87ik0cm0pevfzt5rb7.png",
      url: "/paraphrase",
      author: "Developer Item",
      hashedPassword: "",
      visible: true,
    },
    {
      id: "devitem2",
      title: "Hosting Example",
      description: "Demonstrating website hosting",
      iconName: "Star",
      imageSrc:
        "https://res.cloudinary.com/dtdiarww5/image/upload/v1689882159/i1i9vekr7prg9sedfi7e.png",
      url: "/host?id=demonstration",
      author: "Developer Item",
      hashedPassword: "",
      visible: true,
    },
    {
      id: "devitem3",
      title: "Chess",
      description: "Mate in 1",
      iconName: "",
      imageSrc:
        "https://res.cloudinary.com/dtdiarww5/image/upload/v1689881776/snku2r5uioeswtcknmpd.png",
      url: "https://www.chess.com/",
      author: "Developer Item",
      hashedPassword: "",
      visible: true,
    },
  ];

  const itemsList = serverItemsList.concat(defaultItemsList);

  return (
    <>
      <div className="h-full flex flex-col">
        <HeroSection currentUser={currentUser} />
        <main className="h-3/5 w-full flex bg-light-2">
          <Sidebar />
          <Library currentUser={currentUser} itemsList={itemsList} />
        </main>
      </div>
      <RegisterModal />
      <LoginModal />
      <AddItemModal />
      <OpenLinkModal />
    </>
  );
}
