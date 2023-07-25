"use client";

import saveToRecents from "@/actions/saveToRecents";
import OpenLinkModal from "@/components/homePage/library/OpenLinkModal";
import EmptyState from "@/components/hostPage/EmptyState";
import useOpenLinkModal from "@/hooks/useOpenLinkModal";
import { isCuid } from "@paralleldrive/cuid2";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Host() {
  const router = useRouter();
  const openLinkModal = useOpenLinkModal();
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");
  const [url, setUrl] = useState();

  if (!id) {
    return router.push("/");
  }

  axios
    .get(`/api/gethosturl/${id}`)
    .then((response) => {
      const { hashedPassword, id, title, iconName, url } = response.data;

      if (hashedPassword) {
        if (isCuid(Cookies.get(id) || "")) {
          setUrl(response.data.trueUrl);
          saveToRecents({ id, title, iconName, url });
        } else openLinkModal.open(hashedPassword, id, title, iconName, url);
      }

      setUrl(response.data.trueUrl);
      saveToRecents({ id, title, iconName, url });
    })
    .catch((error) => {
      console.error(error);
      toast.error("Something went wrong.");
    });

  return (
    <>
      <div className="h-full hide-scrollbar">
        {!url && <EmptyState />}
        {url && (
          <iframe
            src={url}
            className="overflow-hidden h-full w-full"
            height="100%"
            width="100%"
          ></iframe>
        )}
      </div>
      <OpenLinkModal />
    </>
  );
}
