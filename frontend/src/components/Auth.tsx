import { useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import type { SignupInput } from "@deepakmehra53/medium-common";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInput, setPostInput] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });

  return (
    <div className="flex justify-center flex-col h-screen">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">Create an account</div>
            <div className=" test-slate-400 items-center flex justify-center">
              {type === "signin"
                ? "Don't hava an account"
                : "Already have an account?"}
              <Link
                className="underline pl-2"
                to={type === "signin" ? "signup" : "/signin"}
              >
                {type === "signin" ? "Sign up " : "Sign in"}
              </Link>
            </div>
          </div>
          <div className="pt-4">
            <LabelledInput
              label="Name"
              placeholder="Username"
              onChange={(e) => {
                setPostInput({
                  ...postInput,
                  name: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Email"
              placeholder="email@gmail.com"
              onChange={(e) => {
                setPostInput({
                  ...postInput,
                  username: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Password"
              placeholder="password"
              type={"password"}
              onChange={(e) => {
                setPostInput({
                  ...postInput,
                  password: e.target.value,
                });
              }}
            />
            <button
              type="button"
              className="mt-6 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signup" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface InputProp {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: InputProp) {
  return (
    <div>
      <div>
        <label className="block mb-2 text-sm font-medium text-black pt-4">
          {label}
        </label>
        <input
          placeholder={placeholder}
          type={type || "text"}
          onChange={onChange}
          id="first_name"
          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          required
        />
      </div>
    </div>
  );
}
