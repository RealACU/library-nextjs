import Link from "next/link";
import Image from "next/image";
import acu_logo from "@/public/acu_logo.svg";
import DynamicIcon from "./homePage/DynamicIcon";
import Dropdown from "./Dropdown";

const Navbar = () => {
  return (
    <nav className="h-[8%] w-full px-5 flex sticky top-0 z-10 items-center p-2 bg-neutral-100">
      <Link href="/" className="h-fit w-fit">
        <Image src={acu_logo} alt="ACU Logo" width={75} height={28} priority />
      </Link>
      <div className="h-full w-full flex gap-6 justify-end items-center">
        <Dropdown label="Contact">
          <li className="flex justify-items-center items-center px-6 hover:bg-neutral-100 hover:text-primary-color">
            <a
              href="mailto:acu.messaging@gmail.com?subject=Hello%20from%20the%20library!"
              target="_blank"
              className="flex items-center gap-1"
            >
              <DynamicIcon iconName="Envelope" />
              Email
            </a>
          </li>
          <li className="flex justify-items-center items-center px-6 hover:bg-neutral-100 hover:text-primary-color">
            <a
              href="https://github.com/RealACU"
              target="_blank"
              className="flex items-center gap-1"
            >
              <DynamicIcon iconName="GitHub" />
              GitHub
            </a>
          </li>
        </Dropdown>
        <Dropdown label="Developer Items">
          <li className="flex justify-items-center items-center px-6 hover:bg-neutral-100 hover:text-primary-color">
            <Link href="/paraphrase">Paraphrase</Link>
          </li>
          <li className="flex justify-items-center items-center px-6 hover:bg-neutral-100 hover:text-primary-color">
            <Link href="/host?id=demonstration">Hosting</Link>
          </li>
        </Dropdown>
        <section className="relative">
          <a
            href="https://github.com/RealACU/library-nextjs"
            target="_blank"
            className="peer justify-self-end"
          >
            <DynamicIcon iconName="GitHub" size={34} />
          </a>
          <div className="h-14 w-32 absolute top-14 -right-1 invisible peer-hover:visible hover:visible p-2 rounded-lg shadow-xl bg-white">
            <div className="h-6 w-6 absolute -top-1 right-2 rotate-45 bg-white -z-50"></div>
            <p className="text-sm z-50">See this project on GitHub!</p>
          </div>
        </section>
      </div>
    </nav>
  );
};

export default Navbar;
