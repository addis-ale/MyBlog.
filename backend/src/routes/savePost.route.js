import { Router } from "express";
import {
  getMySavedPosts,
  savePost,
} from "../controllers/savedPost.controller.js";

const savePostRoute = Router();
savePostRoute.get("/", getMySavedPosts);
savePostRoute.post("/:id", savePost);

export default savePostRoute;
