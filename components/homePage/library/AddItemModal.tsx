"use client";

import Input from "@/components/Input";
import Modal from "@/components/Modal";
import useAddItemModal from "@/hooks/useAddItemModal";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { iconNamesList } from "../DynamicIcon";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import ImageUpload from "../ImageUpload";
import axios from "axios";
import IconDisplay from "./IconDisplay";
import RadioOption from "./RadioOption";
import getValidationFunc from "@/actions/getValidationFunc";
import Heading from "@/components/Heading";
import { createId } from "@paralleldrive/cuid2";
import Cookies from "js-cookie";

enum STEPS {
  TYPE = 0,
  URL = 1,
  PASSWORD = 2,
  INFO = 3,
  IMAGE = 4,
}

const AddItemModal = () => {
  const router = useRouter();
  const addItemModal = useAddItemModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.TYPE);
  const [showPassword, setShowPassword] = useState(false);
  const [urlType, setUrlType] = useState("External Hyperlink");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      customId: undefined,
      title: "",
      description: "",
      iconName: "",
      imageSrc: "",
      url: "",
      trueUrl: undefined,
      password: "",
    },
  });

  const iconName = watch("iconName");
  const imageSrc = watch("imageSrc");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.IMAGE) {
      return onNext();
    }

    setIsLoading(true);

    if (urlType !== "External Hyperlink") {
      if (
        process.env.NODE_ENV === "production" &&
        data.url.startsWith("https://library.vercel.app")
      ) {
        data.url = data.url.slice(26);
      } else if (
        process.env.NODE_ENV === "development" &&
        data.url.startsWith("http://localhost:3000")
      ) {
        data.url = data.url.slice(21);
      } else {
        const customId = createId();
        data.trueUrl = data.url;
        data.url = `/host?id=${customId}`;
        data.customId = customId;
      }
    }

    axios
      .post("/api/item", data)
      .then(() => {
        Cookies.set("contributed", "true", { expires: 7, path: "" });
        toast.success("Successfully posted!");
        router.refresh();
        reset();
        setStep(STEPS.TYPE);
        addItemModal.close();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.IMAGE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.TYPE) {
      return undefined;
    }

    return "Back";
  }, [step]);

  const urlOptions = [
    { value: "External Hyperlink", iconName: "Link" },
    { value: "Host Code", iconName: "Code" },
    { value: "Google Workspace", iconName: "Google" },
  ];

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="What type of contribution you want to add?" />
      {urlOptions.map((option) => {
        return (
          <div
            key={option.value}
            onClick={() => setUrlType(option.value)}
            className="w-full"
          >
            <RadioOption
              label={option.value}
              iconName={option.iconName}
              selected={urlType === option.value}
            />
          </div>
        );
      })}
    </div>
  );

  if (step === STEPS.URL) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Enter the URL here"
          subtitle={
            urlType === "Host Code"
              ? "It must be a supported code platform"
              : urlType === "Google Workspace"
              ? "Anything from Google works"
              : undefined
          }
        />
        <Input
          id="url"
          label="URL"
          required
          register={register}
          errors={errors}
          validationFunc={getValidationFunc(urlType)}
        />
        {urlType === "Host Code" && (
          <div className="flex flex-col">
            <p className="text-sm font-light text-neutral-500">
              Can&rsquo;t use your code?
            </p>
            <a
              href="mailto:acu.messaging@gmail.com?subject=Request%20New%20Code%20Platform"
              target="_blank"
              className="w-fit text-sm underline text-orange-500"
            >
              Message complaints here
            </a>
          </div>
        )}
      </div>
    );
  }

  if (step === STEPS.PASSWORD) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="(Optional) Password Protection"
          subtitle="For surprises, of course"
        />
        <div className="flex">
          <div className="w-[90%]">
            <Input
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              register={register}
              errors={errors}
            />
          </div>
          <div className="w-[10%] flex flex-shrink-0 justify-center items-center">
            {showPassword ? (
              <BiSolidShow
                size={30}
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <BiSolidHide
                size={30}
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <div className="font-bold">What&rsquo;s the title of your contribution?</div>
        <div className="font-light text-neutral-500 -mt-2">
          15 characters or less
        </div>
        <Input
          id="title"
          label="Title"
          required
          register={register}
          errors={errors}
          validationFunc={(value: string) => {
            if (value.length > 15) return false;
            return true;
          }}
        />
        <div className="font-bold">(Optional) Describe it</div>
        <Input
          id="description"
          label="Description"
          register={register}
          errors={errors}
        />
        <div className="font-bold">Choose an icon for it</div>
        <div className="h-[12rem] -mb-7 w-full overflow-y-scroll gap-[4px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          {
            // iconName is the value from the form, so I had to use iconName_ for the parameter
            iconNamesList.map((iconName_: string) => {
              return (
                <div
                  key={iconName_}
                  onClick={() => setCustomValue("iconName", iconName_)}
                  className="col-span-1"
                >
                  <IconDisplay
                    iconName={iconName_}
                    selected={iconName === iconName_}
                  />
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }

  if (step === STEPS.IMAGE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="(Optional) Add an image for your contribution" />
        <ImageUpload
          onChange={(value) => setCustomValue("imageSrc", value)}
          value={imageSrc}
        />
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={addItemModal.isOpen}
      title="Time to contribute to the library!"
      body={bodyContent}
      onClose={addItemModal.close}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.TYPE ? undefined : onBack}
    />
  );
};

export default AddItemModal;
