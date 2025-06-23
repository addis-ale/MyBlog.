import Imagekit from "./Image";

const Comment = () => {
  return (
    <div className=" bg-slate-50 p-4 rounded-xl mb-8">
      <div className="flex items-center gap-4 ">
        <Imagekit
          src={"userImg.jpeg"}
          className={"h-10 w-10 object-cover rounded-full"}
          w="40"
          h="40"
        />
        <span className="font-medium">John Doe</span>
        <span className="text-sm text-gray-500">2 days ago</span>
      </div>
      <div className="mt-1">
        <p className="text-sm text-gray-500">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem vitae
          mollitia nihil, ipsum, expedita eum distinctio iure dolorem quis
          laboriosam nesciunt at. Eius rem eligendi id atque fugiat incidunt
          rerum?
        </p>
      </div>
    </div>
  );
};

export default Comment;
