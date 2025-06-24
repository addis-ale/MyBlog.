import Comment from "./Comment";

const Comments = () => {
  return (
    <div className="flex flex-col gap-8 lg:w-3/5">
      <h1 className="text-xl font-semibold text-gray-500 underline">
        Comments
      </h1>
      <div className="flex justify-between items-center gap-8 w-full">
        <textarea
          placeholder="write a comment..."
          className="rounded-xl p-4 w-full focus:outline-none"
        />
        <button className="bg-blue-800 px-4 py-3 text-white font-medium rounded-xl">
          Send
        </button>
      </div>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
};

export default Comments;
