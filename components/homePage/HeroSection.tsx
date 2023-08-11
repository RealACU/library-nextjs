"use client";

import { signOut } from "next-auth/react";
import Cookies from "js-cookie";
import { useCallback, useMemo, useEffect, useState } from "react";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { SafeUser } from "@/types/safeUser";
import { toast } from "react-hot-toast";

interface HeroSectionProps {
  currentUser: SafeUser | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({ currentUser }) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const visited = Cookies.get("visited");
  const contributed = Cookies.get("contributed");
  const [mounted, setMounted] = useState(false);

  const heroText = useMemo(() => {
    if (!mounted || !currentUser) {
      return "Explore the library!";
    }

    if (!contributed) {
      return `Hi ${currentUser.name}!`;
    }

    return `Thank you so much for contributing, ${currentUser.name}!`;
  }, [mounted, contributed, currentUser]);

  const handleClick = useCallback(() => {
    if (!mounted) {
      return () => {};
    }

    if (!visited) {
      return registerModal.open();
    }

    if (!currentUser) {
      return loginModal.open();
    }

    signOut();
  }, [mounted, visited, currentUser, registerModal, loginModal]);

  const buttonText = useMemo(() => {
    if (!mounted) {
      return "Hello there";
    }

    if (!visited) {
      return "Introduce yourself";
    }

    if (!currentUser) {
      return "Sign back in";
    }

    return `I'm not ${currentUser.name}`;
  }, [mounted, visited, currentUser]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="h-2/5 w-full flex justify-center items-center bg-neutral-200">
      <div className="h-4/5 w-[90%] flex rounded-lg shadow-xl justify-center items-center bg-neutral-100">
        <div className="h-4/5 w-[90%] flex flex-col p-4 rounded-lg shadow-xl justify-center items-center bg-white">
          <h1 className="text-xl">{heroText}</h1>
          <h2>Try different AI models, host your own code, and more</h2>
          <button
            onClick={handleClick}
            className="w-fit px-4 py-2 mt-2 rounded-lg bg-primary-color hover:opacity-80 text-white"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
