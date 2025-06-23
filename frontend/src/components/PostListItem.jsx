import { Link } from "react-router-dom";
import Imagekit from "./Image";

const PostListItem = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* image */}
      <div className="w-full md:hidden xl:block">
        <Imagekit
          src={"postImg.jpeg"}
          className={"rounded-2xl w-full"}
          w={"765"}
        />
      </div>
      {/* details */}
      <div className="flex flex-col gap-4">
        <Link to={"/test"} className="text-4xl font-semibold">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad enim
          assumenda ame.
        </Link>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Written by</span>
          <Link to={""} className="text-blue-800">
            John Doe
          </Link>
          <span>on</span>
          <Link to={""} className="text-blue-800">
            Web Design
          </Link>
          <span>2 days ago</span>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem fugit
          assumenda nesciunt dolore ullam corrupti aliquid, porro consequatur
          minus eaque, sequi neque aspernatur aliquam provident blanditiis
          temporibus iure rerum saepe.
        </p>
        <Link to={"/test"} className="text-sm underline text-blue-800">
          Read More...
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;
