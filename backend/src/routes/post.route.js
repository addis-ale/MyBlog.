import { Router } from "express";
import {
  createPost,
  deletePost,
  featurePost,
  getPost,
  getPosts,
  uploadAuth,
} from "../controllers/post.controller.js";
import { errorHandler } from "../errorHandler.js";

const postRoute = Router();
postRoute.get("/", errorHandler(getPosts));
postRoute.get("/upload-auth", uploadAuth);
postRoute.get("/:slug", getPost);
postRoute.post("/", errorHandler(createPost));
postRoute.delete("/:id", deletePost);
postRoute.patch("/feature", featurePost);
export default postRoute;
