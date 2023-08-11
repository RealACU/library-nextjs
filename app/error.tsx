"use client";

import Button from "@/components/Button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-full w-full flex flex-col gap-4 justify-center items-center bg-neutral-200">
      <h2 className="text-4xl">Sorry about that. Something went wrong.</h2>
      <div className="w-1/6">
        <Button label="Try again" onClick={() => reset()} />
      </div>
    </div>
  );
}
