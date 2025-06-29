import { Link, useParams } from "react-router-dom";
import Imagekit from "../components/Image";
import PostMenuAction from "../components/PostMenuAction";
import { Categories } from "../constants";
import Search from "../components/Search";
import Comments from "../components/Comments";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";

const fetchPost = async (slug) => {
  const res = await axios.get(`api/posts/${slug}`);
  return res.data;
};

const SinglePostPage = () => {
  const { slug } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return "loading...";
  if (error) return "Something went wrong!" + error.message;
  if (!data) return "Post not found!";
  console.log(data);

  return (
    <div className="flex flex-col gap-8 mt-8 ">
      {/* detail */}
      <div className="flex gap-8 flex-col lg:flex-row">
        {/* text */}
        <div className="lg:w-3/5 flex flex-col gap-4">
          <h1 className="font-semibold xl:font-bold text-xl md:3xl xl:4xl 2xl:5xl ">
            {data.title}
          </h1>
          <div className="flex gap-2 items-center text-gray-400 text-sm">
            <span>Written by</span>
            <Link to={""} className="text-blue-800">
              {data.user.username}
            </Link>
            <span>on</span>
            <Link to={""} className="text-blue-800">
              {data.category}
            </Link>
            <span>{format(data.createdAt)}</span>
          </div>
          <p className="text-gray-500 font-medium">{data.desc}</p>
        </div>
        {/* image */}
        {data.coverImg && (
          <div className="hidden lg:block w-2/5">
            <Imagekit
              src={data.coverImg}
              className={"w-full rounded-2xl"}
              w={"358"}
            />
          </div>
        )}
      </div>
      {/* content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* text */}
        <div className="lg:text-lg flex flex-col gap-6 text-justify">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
        {/* menu */}
        <div className="px-4 h-max sticky top-8">
          <h1 className="mb-4 text-sm font-medium ">Author</h1>
          <div className="flex flex-col gap-4">
            {data.user.img && (
              <div className="flex gap-2 items-center">
                <Imagekit
                  src={data.user.img}
                  className={"rounded-full w-12 h-12 object-cover"}
                  w={"48"}
                  h={"48"}
                />
                <Link to={""} className="text-blue-800">
                  {data.user.username}
                </Link>
              </div>
            )}
            <div className="flex gap-2 items-center">
              <Link to={""}>
                <Imagekit src={"facebook.svg"} className={"w-10"} />
              </Link>
              <Link to={""}>
                <Imagekit src={"instagram.svg"} className={"w-10"} />
              </Link>
            </div>
          </div>
          <PostMenuAction post={data} />
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            {Categories.map((catetory) => (
              <Link
                to={catetory.link}
                key={catetory.label}
                className="underline"
              >
                {catetory.label}
              </Link>
            ))}
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium ">Search</h1>
          <Search />
        </div>
      </div>
      <Comments postId={data.id} />
    </div>
  );
};

export default SinglePostPage;
