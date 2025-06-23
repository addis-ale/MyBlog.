import { Link } from "react-router-dom";
import Imagekit from "../components/Image";
import PostMenuAction from "../components/PostMenuAction";
import { Categories } from "../constants";
import Search from "../components/Search";

const SinglePostPage = () => {
  return (
    <div className="flex flex-col gap-8 mt-8">
      {/* detail */}
      <div className="flex gap-8 flex-col lg:flex-row">
        {/* text */}
        <div className="lg:w-3/5 flex flex-col gap-4">
          <h1 className="font-semibold xl:font-bold text-xl md:3xl xl:4xl 2xl:5xl ">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
            in suscipit.
          </h1>
          <div className="flex gap-2 items-center text-gray-400 text-sm">
            <span>Written by</span>
            <Link to={""} className="text-blue-800">
              John doe
            </Link>
            <span>on</span>
            <Link to={""} className="text-blue-800">
              Web Design
            </Link>
            <span>2 days ago</span>
          </div>
          <p className="text-gray-500 font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            itaque earum sequi illo fugiat animi accusantium ipsam magni
            inventore, libero tempora, saepe iusto doloremque rerum deleniti
            unde ut ullam laboriosam?
          </p>
        </div>
        {/* image */}
        <div className="hidden lg:block w-2/5">
          <Imagekit
            src={"postImg.jpeg"}
            className={"w-full rounded-2xl"}
            w={"358"}
          />
        </div>
      </div>
      {/* content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* text */}
        <div className="lg:text-lg flex flex-col gap-6 text-justify">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita
            exercitationem maxime mollitia vitae quod assumenda earum ducimus,
            ex quam eos dolores molestiae delectus beatae deleniti consequuntur
            ut quia laudantium error. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Expedita exercitationem maxime mollitia vitae quod
            assumenda earum ducimus, ex quam eos dolores molestiae delectus
            beatae deleniti consequuntur ut quia laudantium error.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita
            exercitationem maxime mollitia vitae quod assumenda earum ducimus,
            ex quam eos dolores molestiae delectus beatae deleniti consequuntur
            ut quia laudantium error. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Expedita exercitationem maxime mollitia vitae quod
            assumenda earum ducimus, ex quam eos dolores molestiae delectus
            beatae deleniti consequuntur ut quia laudantium error.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita
            exercitationem maxime mollitia vitae quod assumenda earum ducimus,
            ex quam eos dolores molestiae delectus beatae deleniti consequuntur
            ut quia laudantium error. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Expedita exercitationem maxime mollitia vitae quod
            assumenda earum ducimus, ex quam eos dolores molestiae delectus
            beatae deleniti consequuntur ut quia laudantium error.
          </p>
        </div>
        {/* menu */}
        <div className="px-4 h-max sticky top-8">
          <h1 className="mb-4 text-sm font-medium ">Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <Imagekit
                src={"userImg.jpeg"}
                className={"rounded-full w-12 h-12 object-cover"}
                w={"48"}
                h={"48"}
              />
              <Link to={""} className="text-blue-800">
                John Doe
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <div className="flex gap-2 items-center">
              <Link to={""}>
                <Imagekit src={"facebook.svg"} className={"w-10"} />
              </Link>
              <Link to={""}>
                <Imagekit src={"instagram.svg"} className={"w-10"} />
              </Link>
            </div>
          </div>
          <PostMenuAction />
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
    </div>
  );
};

export default SinglePostPage;
