import Imagekit from "./Image";
import { Link } from "react-router-dom";
const FeaturedPost = () => {
  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      {/* First */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* Image */}
        <Imagekit
          src="featured1.jpeg"
          alt={"featured1"}
          w={"895"}
          className={"rounded-3xl object-cover"}
        />
        {/* Details */}
        <div className="flex gap-4 items-center">
          <h1 className="font-semibold lg:text-lg">01.</h1>
          <Link to="" className="lg:text-lg text-blue-800">
            Web Design
          </Link>
          <span className="text-gray-500">2 days ago</span>
        </div>
        {/* link */}
        <Link
          to={"/test"}
          className="text-xl lg:text-3xl font-semibold lg:font-bold"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Link>
      </div>
      {/* Other */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <div className="lg:h-1/3 flex justify-between  gap-4">
          {/* image */}
          <div className="w-1/3 aspect-video">
            <Imagekit
              src={"featured2.jpeg"}
              alt={"featured2"}
              className={"rounded-3xl w-full h-full"}
              w={"298"}
            />
          </div>
          {/* desc */}
          <div className="w-2/3">
            <div className="flex gap-4 items-center text-sm lg:text-base mb-4">
              <h1 className="font-semibold ">02.</h1>
              <Link to="" className="text-blue-800">
                Web Design
              </Link>
              <span className="text-gray-500">2 days ago</span>
            </div>
            {/* title */}
            <Link
              to={"/test"}
              className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
