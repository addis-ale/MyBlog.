import { Link } from "react-router-dom";
import MainCategories from "../components/MainCategories";
import FeaturedPost from "../components/FeaturedPost";
import PostList from "../components/PostList";

const HomePage = () => {
  return (
    <div className=" mt-4 flex flex-col gap-4">
      {/* Breadcrum */}
      <div className="flex gap-4 items-center">
        <Link to={"/"}>Home</Link>
        <span>•</span>
        <span className="text-blue-800">Blogs and Articles </span>
      </div>
      {/* Introduction */}
      <div className="flex items-center justify-between">
        {/* title */}
        <div>
          <h1 className="text-2xl md:text-5xl xl:text-6xl text-gray-800 font-bold">
            Fuel Your Curiosity and Discover Insightful Stories — One Post at a
            Time
          </h1>
          <p className="mt-8 text-md md:text-xl">
            Step into a world of stories, insights, and inspiration. Whether
            you're here to learn something new, spark ideas, or just escape into
            great reads — this blog is your daily dose of thought-provoking
            content crafted with passion and purpose.
          </p>
        </div>
        {/* animated button */}
        <div>
          <Link to="write" className="relative hidden md:block">
            <svg
              viewBox="0 0 200 200"
              width="200"
              height="200"
              className="text-lg tracking-widest animate-spin animated-btn"
            >
              <path
                id="circlePath"
                fill="none"
                d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
              />
              <text>
                <textPath href="#circlePath" startOffset={"0%"}>
                  Write your story
                </textPath>
                <textPath href="#circlePath" startOffset={"50%"}>
                  Share your idea
                </textPath>
              </text>
            </svg>
            <button className="flex items-center justify-center rounded-full bg-blue-800 p-2 absolute top-0 left-0 right-0 bottom-0 m-auto w-20 h-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="50"
                height="50"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <line x1="6" y1="18" x2="18" y2="6" />
                <polyline points="9 6 18 6 18 15" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
      {/* Category */}
      <MainCategories />
      {/* Featured post */}
      <FeaturedPost />
      {/* Post list */}
      <div>
        {/* title */}
        <h1 className="text-gray-600 font-semibold text-2xl my-8">
          Recent Posts
        </h1>
        <PostList />
      </div>
    </div>
  );
};

export default HomePage;
