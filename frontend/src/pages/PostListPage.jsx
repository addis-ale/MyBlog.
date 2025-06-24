import { useState } from "react";
import PostList from "../components/PostList";
import SideMenu from "../components/SideMenu";

const PostListPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <h1 className="text-gray-500 text-2xl mb-8">Development Blog</h1>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="md:hidden bg-blue-800 text-sm text-white rounded-2xl px-4 py-2 mb-4"
      >
        {open ? "Close" : "Filter or Search"}
      </button>

      <div className="flex flex-col-reverse md:flex-row gap-8">
        <div className="">
          <PostList />
        </div>
        {/* Menu */}
        <div className={`${open ? "block" : "hidden"} md:block`}>
          <SideMenu />
        </div>
      </div>
    </div>
  );
};

export default PostListPage;
