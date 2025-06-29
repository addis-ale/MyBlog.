import axios from "axios";
import Imagekit from "./Image";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";

const fetchPosts = async () => {
  const res = await axios.get("/api/posts", {
    params: { limit: 4, sortQuery: "newest", featured: true },
  });
  return res.data;
};
const FeaturedPost = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["featuredPost"],
    queryFn: () => fetchPosts(),
  });
  if (isPending) return "loading...";
  if (error) return "Something went wrong!" + error.message;

  const posts = data.posts;
  console.log("feature", posts);
  if (!posts || posts.length === 0) {
    return;
  }
  return (
    <>
      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        {/* First */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          {/* Image */}
          {posts[0].coverImg && (
            <Imagekit
              src={posts[0].coverImg}
              alt={"featured1"}
              w={"895"}
              className={"rounded-3xl object-cover"}
            />
          )}
          {/* Details */}
          <div className="flex gap-4 items-center">
            <h1 className="font-semibold lg:text-lg">01.</h1>
            <Link to="" className="lg:text-lg text-blue-800">
              {posts[0].category}
            </Link>
            <span className="text-gray-500">{format(posts[0].createdAt)}</span>
          </div>
          {/* link */}
          <Link
            to={`${posts[0].slug}`}
            className="text-xl lg:text-3xl font-semibold lg:font-bold"
          >
            {posts[0].title}
          </Link>
        </div>
        {/* Other */}
        {posts.map((post, index) => {
          const number = index + 1;
          const formatedNum = String(number).padStart(2, "0");
          if (index === 0) return;
          return (
            <div className="w-full lg:w-1/2 flex flex-col gap-4" key={post.id}>
              <div className="lg:h-1/3 flex justify-between  gap-4">
                {/* image */}
                {post.coverImg && (
                  <div className="w-1/3 aspect-video">
                    <Imagekit
                      src={post.coverImg}
                      alt={"featured2"}
                      className={"rounded-3xl w-full h-full"}
                      w={"298"}
                    />
                  </div>
                )}
                {/* desc */}
                <div className="w-2/3">
                  <div className="flex gap-4 items-center text-sm lg:text-base mb-4">
                    <h1 className="font-semibold ">{formatedNum}.</h1>
                    <Link to="" className="text-blue-800">
                      {post.category}
                    </Link>
                    <span className="text-gray-500">2 days ago</span>
                  </div>
                  {/* title */}
                  <Link
                    to={`${post.slug}`}
                    className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
                  >
                    {post.title}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FeaturedPost;
