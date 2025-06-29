import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PostMenuAction = ({ post }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isAdmin = user?.publicMetadata?.role === "admin" || false;
  const { data: savedPosts } = useQuery({
    queryKey: ["savedPosts"],
    queryFn: async () => {
      const token = await getToken();
      return axios.get(`/api/save-post`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    },
  });

  const isSaved = savedPosts?.data?.some((p) => p.postId === post.id) || false;

  const savePost = async (postId) => {
    const token = await getToken();
    const res = await axios.post(`/api/save-post/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  };
  const { mutate: deleteMutate, isPending: deletePending } = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      const res = await axios.delete(`/api/posts/${post.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return res.data;
    },
    onSuccess: () => {
      navigate("/");
      toast.success("Post deleted");
    },
    onError: (error) => {
      toast(error.response.data);
    },
  });
  const { mutate: savePostMutation, isPending: saving } = useMutation({
    mutationFn: (postId) => savePost(postId),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["savedPosts"] });

      if (res.type === "saved") {
        toast.success("Post saved!");
      } else if (res.type === "unSaved") {
        toast.success("Post unsaved!");
      } else {
        toast.error("Please try again.");
      }
    },
  });
  const featureMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `/api/posts/feature`,
        {
          postId: post.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", post.slug] });
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });
  const handleFeature = () => {
    featureMutation.mutate();
  };
  const handleSave = () => {
    if (!user) {
      navigate("/login");
    }
    savePostMutation(post.id);
  };
  return (
    <div className="flex flex-col gap-4">
      <h1 className="mt-8 mb-4 text-sm font-medium ">Actions</h1>
      {user && (
        <div
          className="flex gap-2 items-center py-2 text-sm cursor-pointer"
          onClick={handleSave}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="20px"
            height="20px"
            fill={`${isSaved ? "black" : "none"}`}
          >
            <path
              d="M12 4C10.3 4 9 5.3 9 7v34l15-9 15 9V7c0-1.7-1.3-3-3-3H12z"
              stroke="black"
              strokeWidth="2"
            />
          </svg>
          {saving ? (
            <span className="text-xs text-green-600">Processing...</span>
          ) : (
            <span>Save this post</span>
          )}
        </div>
      )}

      {isAdmin && (
        <div
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
          onClick={handleFeature}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="20px"
            height="20px"
          >
            <path
              d="M24 2L29.39 16.26L44 18.18L33 29.24L35.82 44L24 37L12.18 44L15 29.24L4 18.18L18.61 16.26L24 2Z"
              stroke="black"
              strokeWidth="2"
              fill={
                featureMutation.isPending
                  ? post.isFeaturd
                    ? "none"
                    : "black"
                  : post.isFeaturd
                  ? "black"
                  : "none"
              }
            />
          </svg>
          <span>Feature</span>
          {featureMutation.isPending && (
            <span className="text-xs">(in progress)</span>
          )}
        </div>
      )}

      {user && (user.username === post.user.username || isAdmin) && (
        <div
          className="flex items-center gap-2 text-sm py-2 cursor-pointer"
          onClick={() => deleteMutate()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            fill="red"
            width="20px"
            height="20px"
          >
            <path d="M 21 2 C 19.354545 2 18 3.3545455 18 5 L 18 7 L 10.154297 7 A 1.0001 1.0001 0 0 0 9.984375 6.9863281 A 1.0001 1.0001 0 0 0 9.8398438 7 L 8 7 A 1.0001 1.0001 0 1 0 8 9 L 9 9 L 9 45 C 9 46.645455 10.354545 48 12 48 L 38 48 C 39.645455 48 41 46.645455 41 45 L 41 9 L 42 9 A 1.0001 1.0001 0 1 0 42 7 L 40.167969 7 A 1.0001 1.0001 0 0 0 39.841797 7 L 32 7 L 32 5 C 32 3.3545455 30.645455 2 29 2 L 21 2 z M 21 4 L 29 4 C 29.554545 4 30 4.4454545 30 5 L 30 7 L 20 7 L 20 5 C 20 4.4454545 20.445455 4 21 4 z M 11 9 L 18.832031 9 A 1.0001 1.0001 0 0 0 19.158203 9 L 30.832031 9 A 1.0001 1.0001 0 0 0 31.158203 9 L 39 9 L 39 45 C 39 45.554545 38.554545 46 38 46 L 12 46 C 11.445455 46 11 45.554545 11 45 L 11 9 z M 18.984375 13.986328 A 1.0001 1.0001 0 0 0 18 15 L 18 40 A 1.0001 1.0001 0 1 0 20 40 L 20 15 A 1.0001 1.0001 0 0 0 18.984375 13.986328 z M 24.984375 13.986328 A 1.0001 1.0001 0 0 0 24 15 L 24 40 A 1.0001 1.0001 0 1 0 26 40 L 26 15 A 1.0001 1.0001 0 0 0 24.984375 13.986328 z M 30.984375 13.986328 A 1.0001 1.0001 0 0 0 30 15 L 30 40 A 1.0001 1.0001 0 1 0 32 40 L 32 15 A 1.0001 1.0001 0 0 0 30.984375 13.986328 z" />
          </svg>
          {deletePending ? (
            <span className="text-red-500 text-sm">Deleting...</span>
          ) : (
            <span>Delete this post</span>
          )}
        </div>
      )}
    </div>
  );
};

export default PostMenuAction;
