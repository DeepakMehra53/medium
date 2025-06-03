interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <div className="border border-slate-200 pb-4">
      <div className="flex">
        <Avatar name={authorName} />

        <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
          {authorName}
        </div>
        <div className=" pl-2 flex justify-center flex-col">
          <Circle />
        </div>
        <div className="pl-2 font-thin text-slate-400 text-sm flex justify-center flex-col">
          {publishedDate}
        </div>
      </div>
      <div className="font-semibold text-xl ">{title}</div>
      <div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
      <div className="text-slate-500 text-sm font-thin">{`${Math.ceil(
        content.length / 100
      )} minute(s)`}</div>
    </div>
  );
};

function Circle() {
  return <div className="h-1 w-1 bg-slate-400 rounded-2xl"> </div>;
}

function Avatar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="text-xs  text-gray-600 dark:text-gray-300">
        {(name[0] || "") + (name[1] || "")}
      </span>
    </div>
  );
}
