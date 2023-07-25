"use client";

import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Heading from "@/components/Heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useState } from "react";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

const RegisterModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      secret: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .catch((error) => {
        console.log(error);
        toast("Looks like I couldn't let you in.", { icon: "😔" });
      })
      .then(() => {
        Cookies.set("visited", "true", { expires: 3650, path: "" });

        signIn("credentials", {
          ...data,
          redirect: false,
        }).then((callback) => {
          setIsLoading(false);

          if (callback?.ok) {
            toast("Welcome to the library! Enjoy your stay.", { icon: "😀" });
            router.refresh();
            registerModal.close();
            return;
          }

          if (callback?.error) {
            console.error(callback.error);
            toast("Could you come back later?", { icon: "❤️‍🩹" });
          }
        });
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="What should I call you?" />
      <Input
        id="name"
        label="Name"
        required
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Heading
        title="Tell me a secret that only you know!"
        subtitle="Don't worry, it's just between us"
      />
      <Input
        id="secret"
        label="Secret"
        required
        disabled={isLoading}
        register={register}
        errors={errors}
      />
    </div>
  );

  const footerContent = (
    <button
      onClick={() => {
        if (!isLoading) {
          registerModal.close();
          loginModal.open();
        }
      }}
      className={`text-blue-500 underline mt-2 ${
        isLoading ? "cursor-not-allowed" : ""
      }`}
    >
      I&rsquo;m not new here.
    </button>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Hold Up!"
      body={bodyContent}
      footer={footerContent}
      onClose={registerModal.close}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Go"
    />
  );
};

export default RegisterModal;
