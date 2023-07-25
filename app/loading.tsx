import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="h-full w-full flex flex-col gap-8 justify-center items-center bg-neutral-200">
      <ClipLoader size={50} color="black" />
      <p className="text-4xl">You should love yourself</p>
    </div>
  );
}
