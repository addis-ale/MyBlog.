import { useUser } from "@clerk/clerk-react";

import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { Categories } from "../constants";

const Write = () => {
  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (isLoaded && !isSignedIn) {
    return <div>You have to sign in first.</div>;
  }

  return (
    <div className=" h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-xl font-light">Create a New Post</h1>
      <form action="" className="flex flex-col gap-6 flex-1">
        <button className="w-max p-2 shadow-md rounded-xl text-sm bg-white text-gray-500">
          Add a cover image
        </button>
        <input
          type="text"
          placeholder="My Awesome Story"
          className="text-gray-500 font-semibold text-4xl bg-transparent focus:outline-none"
        />
        <div className="flex items-center gap-4">
          <label htmlFor="cat" className="text-sm">
            Choose a Category
          </label>
          <select
            name="cat"
            id="cat"
            className="bg-white rounded-xl shadow-md p-2"
          >
            {Categories.map((cat) => {
              if (cat.label === "All Posts") {
                cat.label = "General";
              }
              return (
                <option value={cat.value} key={cat.label}>
                  {cat.label}
                </option>
              );
            })}
          </select>
        </div>
        <textarea
          className="bg-white rounded-xl shadow-md p-4"
          name="desc"
          id=""
          placeholder="A Short Description"
        />
        <ReactQuill
          theme="snow"
          className="flex-1 bg-white rounded-xl shadow-md"
        />
        <button className="bg-blue-800 font-medium rounded-xl text-white mt-4 p-2 w-36">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Write;
