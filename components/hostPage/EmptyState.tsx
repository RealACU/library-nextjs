import { MdKeyboardArrowDown } from "react-icons/md";

const EmptyState = () => {
  return (
    <div className="h-full w-full flex flex-col animate-pulse">
      <section className="h-[10%] grid grid-cols-3 border-b-4 px-6 border-b-neutral-600">
        <div className="flex m-2 items-center gap-3 col-span-2">
          <div className="absolute h-6 w-6 m-2 rounded-full rounded-tl-none rotate-45 bg-neutral-600"></div>
          <div className="h-7 w-16 ml-10 rounded-lg bg-neutral-600"></div>
          <div className="flex items-center">
            <div className="h-4 w-12 rounded-full bg-neutral-600"></div>
            <MdKeyboardArrowDown className="text-neutral-600" />
          </div>
          <div className="flex items-center">
            <div className="h-4 w-12 rounded-full bg-neutral-600"></div>
            <MdKeyboardArrowDown className="text-neutral-600" />
          </div>
          <div className="h-4 w-10 rounded-full bg-neutral-600"></div>
          <div className="h-4 w-10 rounded-full bg-neutral-600"></div>
          <div className="h-4 w-10 rounded-full bg-neutral-600"></div>
        </div>
        <div className="flex m-2 justify-end items-center gap-3 col-span-1">
          <div className="h-6 w-16 rounded-lg bg-neutral-600"></div>
          <div className="h-6 w-16 rounded-lg bg-neutral-600"></div>
        </div>
      </section>
      <section className="h-[90%] flex flex-col justify-center items-center gap-2">
        <div className="h-[3rem] w-[35%] rounded-full bg-neutral-600"></div>
        <div className="h-[3rem] w-[30%] rounded-full bg-neutral-600"></div>
        <div className="h-[1rem] w-[20%] rounded-full bg-neutral-600 mt-6"></div>
        <div className="h-[1rem] w-[40%] rounded-full bg-neutral-600"></div>
        <div className="h-[1rem] w-[37%] rounded-full bg-neutral-600"></div>
        <div className="flex gap-4 pt-8">
          <div className="h-6 w-16 rounded-lg bg-neutral-600"></div>
          <div className="h-6 w-16 rounded-lg bg-neutral-600"></div>
        </div>
        <div className="h-[1rem] w-[15%] rounded-full bg-neutral-600 mt-6"></div>
        <div className="flex gap-2 mt-3">
          <div className="h-8 w-8 rounded-full bg-neutral-600"></div>
          <div className="h-8 w-8 rounded-full bg-neutral-600"></div>
          <div className="h-8 w-8 rounded-full bg-neutral-600"></div>
          <div className="h-8 w-8 rounded-full bg-neutral-600"></div>
          <div className="h-8 w-8 rounded-full bg-neutral-600"></div>
          <div className="h-8 w-8 rounded-full bg-neutral-600"></div>
          <div className="h-8 w-8 rounded-full bg-neutral-600"></div>
        </div>
      </section>
    </div>
  );
};

export default EmptyState;
