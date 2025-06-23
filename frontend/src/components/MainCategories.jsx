import { Link } from "react-router-dom";
import { Categories } from "../constants";
import Search from "./Search";

const MainCategories = () => {
  return (
    <div className="w-full hidden md:flex p-4 shadow-lg items-center justify-center gap-8 bg-white rounded-3xl xl:rounded-full">
      {/* links */}
      <div className=" flex flex-1 flex-wrap items-center justify-between w-full">
        {Categories.map((category) => (
          <Link
            key={category.label}
            to={category.link}
            className=" px-4 py-2 hover:bg-blue-50 rounded-full"
          >
            {category.label}
          </Link>
        ))}
      </div>
      <span className="text-xl font-medium">|</span>
      {/* search */}
      <Search />
    </div>
  );
};

export default MainCategories;
