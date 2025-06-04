import { AppBar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hook";

export const Blogs =()=>{
  const {loading,blogs} = useBlogs()
  if(loading){
    return <div>
      loading...
    </div>
  }
  
    return (
      <div>
        <AppBar />
        <div className="flex justify-center">
          <div className=" max-w-xl">
            {blogs.map((blog) => (
              <BlogCard
                authorName={blog.author.name}
                title={blog.title}
                content={blog.content}
                publishedDate={blog.}
              />
            ))}
           
          </div>
        </div>
      </div>
    );
}