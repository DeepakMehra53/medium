import { Circle } from "./BlogCard";

export const Skeleton = () => {
  return (
    <div role="status" className=" animate-pulse">
      <div className=" p-4  border-slate-3 pb-4 w-screen max-w-screen-md">
        <div className="flex">
          <div className="h-4 w-4 bg-gray-200 rounded-full  mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>

          <div className=" pl-2 flex justify-center flex-col">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-slate-400 text-sm flex justify-center flex-col">
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
          </div>
        </div>
        <div className="font-semibold text-xl pt-2">
          <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        </div>
        <div className="text-md font-thin">
          <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        </div>
        <div className="text-slate-500 text-sm font-thin pt-6">
          <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        </div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
};
