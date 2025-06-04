import type { Blog } from "../hook";
import { AppBar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const SingleBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 w-full pt-20 px-10 max-w-screen-2xl">
          <div className="col-span-8">
            <div className="text-4xl font-extrabold ">{blog.title}</div>
            <div className="text-slate-500 pt-2">Post on 2nd Dec 2023</div>
            <div className="pt-4">{blog.content}</div>
          </div>
          <div className="col-span-4">

            <div className="text-slate-600 text-lg">

            Author
            </div>

            <div className="flex w-full ">
                <div className="pr-2  flex flex-col justify-center">

                <Avatar name={blog.author.name || "Anonymous"}/>
                </div>
              <div>

            <div className="text-xl font-bold">
              {blog.author.name || "Anonymous"}
            </div>
            <div className="pt-2 text-slate-500">
              Random catch phares about the author's ability to grad the user's
              attention
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
