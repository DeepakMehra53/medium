import axios from "axios";
import { AppBar } from "./Appbar";
import { BACKEND_URL } from "../config";
import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <div>
      <AppBar />
      <div className="flex justify-center ">
        <div className="max-w-screen-lg w-full pt-9">
          <input
            type="text "
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Title"
          />
          <TextEditor onChange={(e)=>setContent(e.target.value)} />
          <button
            type="submit"
            onClick={async() => {
                const token = localStorage.getItem("token");
           const response = await  axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content,
              }, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
              });
              navigate(`/blog/${response.data.id}`)
            }}
            className="mt-1 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};

interface TextProps {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextEditor({ onChange }: TextProps) {
  return (
    <form>
      <div className="w-full mb-4 mt-3 ">
        <div className="flex items-center justify-between     ">
          <div className=" py-2 bg-white rounded-b-lg w-full">
            <label className="sr-only">Publish post</label>
            <textarea
              rows={8}
              id="editor"
              onChange={onChange}
              className="focus:outline-none block w-full px-0 text-sm text-gray-800 border rounded-sm border-slate-400 pl-3 pt-1"
              placeholder="Write an article..."
              required
            />
          </div>
        </div>
      </div>
    </form>
  );
}
