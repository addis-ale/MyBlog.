import { Link, useSearchParams } from "react-router-dom";
import { Categories, filters } from "../constants";
import Search from "./Search";

const SideMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const updatedSearchParams = Object.fromEntries(searchParams);
  const handleFilter = (e) => {
    const filter = e.target.value;
    if (searchParams.get("sortQuery") !== e.target.value) {
      setSearchParams({ ...updatedSearchParams, sortQuery: filter });
    }
  };
  const handleCat = (cat) => {
    setSearchParams({ ...updatedSearchParams, cat: cat });
  };
  return (
    <div className="h-max sticky top-8 px-4">
      <h1 className="mb-4 text-sm font-medium">Search</h1>
      <Search />
      <h1 className="mb-4 mt-8 text-sm font-medium">Filter</h1>
      <div className="flex flex-col gap-2 text-sm">
        {filters.map((filter) => (
          <label
            key={filter.label}
            htmlFor=""
            className="flex gap-2 items-center cursor-pointer"
          >
            <input
              value={filter.value}
              name="sort"
              type="radio"
              onChange={handleFilter}
              className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 rounded-sm checked:bg-blue-800 bg-white"
            />
            <span>{filter.label}</span>
          </label>
        ))}
      </div>

      <h1 className="mb-4 mt-8 text-sm font-medium">Categories</h1>
      <div className="flex flex-col gap-4 text-sm">
        {Categories.map((cat) => (
          <span
            className="underline cursor-pointer"
            onClick={() => handleCat(cat.label)}
          >
            {cat.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
