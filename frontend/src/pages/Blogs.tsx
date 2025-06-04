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
          <div >
            {blogs.map((blog) => (
              <BlogCard
              id={blog.id}
                authorName={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={"2nd fed 2024"}
              />
            ))}
           
          </div>
        </div>
      </div>
    );
}