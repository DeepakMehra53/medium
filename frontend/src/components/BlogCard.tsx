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
    <div className="">
      <div className="flex">
        <div className="flex justify-center flex-col">
          <Avatar name={authorName} />
        </div>
        <div className="font-extralight pl-2 ">{authorName}</div>
        <Circle />
        <div className="pl-2 font-thin text-slate-400">{publishedDate}</div>
      </div>
      <div>{title}</div>
      <div>{content.slice(0, 100) + "..."}</div>
      <div>{`${Math.ceil(content.length / 100)}minutes`}</div>
      <div className="bg-slate-200 h-1 w-full"></div>
    </div>
  );
};

function Circle() {
  return <div className="h-1 w-1 text-slate-200 rounded-2xl"> </div>;
}

function Avatar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-4 h-4 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="text-xs  text-gray-600 dark:text-gray-300">
        {(name[0] || "") + (name[1] || "")}
      </span>
    </div>
  );
}
