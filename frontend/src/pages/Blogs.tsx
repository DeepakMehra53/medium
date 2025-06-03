import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"

export const Blogs =()=>{
    return (
      <div>
          <AppBar />
        <div className="flex justify-center">
          <div className=" max-w-xl">
            <BlogCard
              authorName={"deepak"}
              title={
                "Hey, I’m a fellow W streamer who just started watching—keep growing and take care!"
              }
              content={"daca adidnw thwe  winw adadaw"}
              publishedDate={"2nd fed 2024"}
            />
          </div>
        </div>
      </div>
    );
}