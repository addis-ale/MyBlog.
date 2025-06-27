import { useAuth, useUser } from "@clerk/clerk-react";

import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { Categories } from "../constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../components/Upload";

const Write = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [value, setValue] = useState();
  const [cover, setCover] = useState("");
  const [progress, setProgress] = useState(0);
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  useEffect(() => {
    img && setValue((prev) => prev + `<p><image src="${img.url}"/></p>`);
  }, [img]);

  useEffect(() => {
    video &&
      setValue(
        (prev) => prev + `<p><iframe class="ql-video" src="${video.url}"/></p>`
      );
  }, [video]);

  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: async (newPost) => {
      try {
        const token = await getToken();
        const res = await axios.post("/api/posts", newPost, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        return res;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    //TODO: revalidate the get method
    onSuccess: (res) => {
      toast.success("Post has been created!");
      navigate(`/${res.data.post.slug}`);
      queryClient.invalidateQueries({ queryKey: [""] });
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = {
      coverImg: cover.filePath || "",
      title: form.get("title"),
      category: form.get("cat"),
      desc: form.get("desc"),
      content: value,
    };
    console.log(data);
    mutate(data);
  };
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (isLoaded && !isSignedIn) {
    return <div>You have to sign in first.</div>;
  }

  return (
    <div className=" h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-xl font-light">Create a New Post</h1>
      <form
        action=""
        className="flex flex-col gap-6 flex-1"
        onSubmit={handleSubmit}
      >
        <Upload type="image" setProgress={setProgress} setData={setCover}>
          <button
            type="button"
            className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white"
          >
            Add a cover image
          </button>
        </Upload>
        <input
          type="text"
          name="title"
          placeholder="My Awesome Story"
          className="text-gray-500 font-semibold text-4xl bg-transparent focus:outline-none"
        />
        <div className="flex items-center gap-4">
          <label htmlFor="cat" className="text-sm">
            Choose a Category
          </label>
          <select
            name="cat"
            id="cat"
            className="bg-white rounded-xl shadow-md p-2"
          >
            {Categories.map((cat) => {
              if (cat.label === "All Posts") {
                cat.label = "General";
              }
              return (
                <option value={cat.value} key={cat.label}>
                  {cat.label}
                </option>
              );
            })}
          </select>
        </div>
        <textarea
          className="bg-white rounded-xl shadow-md p-4"
          name="desc"
          id=""
          placeholder="A Short Description"
        />
        <div className="flex flex-1 ">
          <div className="flex flex-col gap-2 mr-2">
            <Upload type="image" setProgress={setProgress} setData={setImg}>
              🌆
            </Upload>
            <Upload type="video" setProgress={setProgress} setData={setVideo}>
              ▶️
            </Upload>
          </div>
          <ReactQuill
            theme="snow"
            className="flex-1 rounded-xl bg-white shadow-md"
            value={value}
            onChange={setValue}
            readOnly={0 < progress && progress < 100}
          />
        </div>
        <button
          disabled={isPending || (0 < progress && progress < 100)}
          className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {isPending ? "Loading..." : "Send"}
        </button>
        {"Progress:" + progress}
      </form>
    </div>
  );
};

export default Write;
