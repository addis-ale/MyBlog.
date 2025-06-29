import { Link } from "react-router-dom";
import Imagekit from "./Image";
import { format } from "timeago.js";
const PostListItem = ({ post }) => {
  return (
    <div className="flex flex-col xl:flex-row gap-8 mb-8">
      {/* image */}
      {post.coverImg && (
        <div className="w-full md:hidden xl:block">
          <Imagekit
            src={post.coverImg}
            className={"rounded-2xl w-full"}
            w={"765"}
          />
        </div>
      )}
      {/* details */}
      <div className="flex flex-col gap-4">
        <Link to={`/${post.slug}`} className="text-4xl font-semibold">
          {post.title}
        </Link>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Written by</span>
          <Link
            to={`/posts?author=${post.user.username}`}
            className="text-blue-800"
          >
            {post.user.username}
          </Link>
          <span>on</span>
          <Link to={""} className="text-blue-800">
            {post.category}
          </Link>
          <span>{format(post.createdAt)}</span>
        </div>
        <p>{post.desc}</p>
        <Link to={`/${post.slug}`} className="text-sm underline text-blue-800">
          Read More...
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;
