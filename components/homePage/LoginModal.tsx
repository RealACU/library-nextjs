"use client";

import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Heading from "@/components/Heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useState } from "react";
import useLoginModal from "@/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const LoginModal = () => {
  const router = useRouter();
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

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        Cookies.set("visited", "true", { expires: 3650, path: "" });
        toast("Good to see you again!", { icon: "👋" });
        router.refresh();
        loginModal.close();
        return;
      }

      if (callback?.error) {
        console.error(callback.error);
        toast("Maybe you forgot something?", { icon: "❤️‍🩹" });
      }
    });
  };

  const bodyContent = (
    <div className="flex flex-col gap-3">
      <Heading title="What was your name again?" subtitle="I'll make sure to write it down next time" />
      <Input
        id="name"
        label="Name"
        required
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Heading
        title="You know what to put here"
        subtitle="Don't worry, it's still just between us"
      />
      <Input
        id="secret"
        label="You know..."
        required
        disabled={isLoading}
        register={register}
        errors={errors}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Welcome Back!"
      body={bodyContent}
      onClose={loginModal.close}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Go"
    />
  );
};

export default LoginModal;
