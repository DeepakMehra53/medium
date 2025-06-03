import { useState, type ChangeEvent } from "react";
import { Link, } from "react-router-dom";
import type { SignupInput } from "@deepakmehra53/medium-common";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const [postInput,setPostInput] =useState<SignupInput>({
        name:"",
        username:"",
        password:""
    })

  return (
    <div className="flex justify-center flex-col h-screen">
      <div className="flex justify-center">
        <div>
          <div className="text-3xl font-extrabold">Create an account</div>
          <div className=" test-slate-400 items-center flex justify-center">
            Already have an account?
            <Link className="underline pl-2" to={"/signin"}>
              Login
            </Link>
          </div>
        </div>
        <LabelledInput
          label="Name"
          placeholder="Username"
          onChange={(e) => {
            setPostInput((c) => ({
              ...c,
              name: e.target.value,
            }));
          }}
        />
        <LabelledInput
          label="Email"
          placeholder="email@gmail.com"
          onChange={(e) => {
            setPostInput((c) => ({
              ...c,
              name: e.target.value,
            }));
          }}
        />
        <LabelledInput
          label="Password"
          placeholder="password"
          type={"password"}
          onChange={(e) => {
            setPostInput((c) => ({
              ...c,
              name: e.target.value,
            }));
          }}
        />
      </div>
    </div>
  );
};

interface InputProp {
    label:string;
    placeholder:string;
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void;
    type?:string

}

function LabelledInput({label,placeholder,onChange,type}:InputProp){
    return <div>
        <div>
            <label   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input  placeholder={placeholder} type={type || "text"} onChange={onChange}  id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
    </div>
}
