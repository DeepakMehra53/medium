import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

export const AppBar = () => {
  return (
    <div className="flex justify-between border-b px-10 py-4 ">
      <Link
        to={"/blogs"}
        className="flex flex-col justify-center cursor-pointer"
      >
        Medium
      </Link>

      <div>
        <Avatar name="Deepak" />
      </div>
    </div>
  );
};
