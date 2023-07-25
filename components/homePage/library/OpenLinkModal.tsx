"use client";

import Heading from "@/components/Heading";
import Modal from "@/components/Modal";
import useOpenLinkModal from "@/hooks/useOpenLinkModal";
import { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import saveToRecents from "@/actions/saveToRecents";
import { createId } from "@paralleldrive/cuid2";
import { ClipLoader } from 'react-spinners';

enum STEPS {
  PASSWORD = 0,
  WARNING = 1,
}

const OpenLinkModal = () => {
  const router = useRouter();
  const openLinkModal = useOpenLinkModal();

  const [step, setStep] = useState(STEPS.PASSWORD);

  useEffect(() => {
    if (openLinkModal.isOpen && !openLinkModal.hashedPassword) {
      return setStep(STEPS.WARNING);
    }

    return setStep(STEPS.PASSWORD);
  }, [openLinkModal]);

  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCorrect, setIsCorrect] = useState(true);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && value) {
      verify();
    }
  }

  async function verify() {
    setIsLoading(true);

    axios
      .post("/api/checkpassword", {
        value,
        hashedPassword: openLinkModal.hashedPassword,
      })
      .then((response) => {
        if (response.data.matches) {
          setIsCorrect(true);
          Cookies.set(openLinkModal.id, `${createId()}`, {
            expires: 7,
          });

          if (openLinkModal.url.startsWith("http")) {
            return setStep(STEPS.WARNING);
          }

          router.push(openLinkModal.url);
          return saveToRecents(openLinkModal); // Extracts properties from openLinkModal
        }

        setIsCorrect(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Enter password"
        subtitle="Press enter or the arrow to verify"
      />
      <div
        className={`w-full flex bg-white rounded-lg overflow-hidden border-2 border-neutral-300
        ${!isCorrect ? "border-red-500" : ""}`}
      >
        <input
          type="text"
          value={value}
          placeholder="Password"
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          className="w-[calc(100%-2rem)] p-2 focus:outline-none"
        />
        <div
          onClick={() => {
            if (value) verify();
          }}
          className="h-8 w-8 flex m-1 justify-center items-center rounded-md bg-primary-color text-white hover:opacity-70 cursor-pointer"
        >
          <IoSend />
        </div>
      </div>
      {!isCorrect && <p className="text-red-500 -mt-6">Incorrect password</p>}
      {isLoading && (
        <div className="flex gap-2">
          <ClipLoader size={20} color="black" />
          <p>Checking password...</p>
        </div>
      )}
    </div>
  );

  if (step === STEPS.WARNING) {
    bodyContent = (
      <div className="flex flex-col gap-2 items-center">
        <p>This will take you to</p>
        <div className="w-full font-semibold p-2 bg-neutral-300 rounded-lg flex justify-center">
          {openLinkModal.url}
        </div>
        <p>Are you sure you want to go there?</p>
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={openLinkModal.isOpen}
      title="Hold up!"
      body={bodyContent}
      onClose={openLinkModal.close}
      onSubmit={() => {
        window.open(openLinkModal.url, "_blank");
        const { id, title, iconName, url } = openLinkModal;
        saveToRecents({ id, title, iconName, url });
        openLinkModal.close();
      }}
      actionLabel={step === STEPS.WARNING ? "Proceed" : undefined}
      secondaryAction={openLinkModal.close}
      secondaryActionLabel={
        step === STEPS.WARNING ? "Back to safety" : undefined
      }
    />
  );
};

export default OpenLinkModal;
