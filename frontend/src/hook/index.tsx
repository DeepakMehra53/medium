import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
export interface Blog {
  content: string;
  title: string;
  id: number;
  author: {
    name: string;
  };
}

export const useBlog=({id}:{id:string})=>{
    const [loading, setloading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    useEffect(() => {
      const token = localStorage.getItem("token");
      axios
        .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setBlog(response.data.blogs);
          setloading(false);
        });
    }, [id]);
    return { loading, blog};
}



export const useBlogs = () => {
  const [loading, setloading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBlogs(response.data.data);
        setloading(false);
      });
  }, []);
  return { loading, blogs };
};
