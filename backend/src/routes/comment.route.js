import { Router } from "express";
import {
  addComment,
  deleteComment,
  getPostComments,
} from "../controllers/comment.controller.js";

const commentRoute = Router();

commentRoute.get("/:postId", getPostComments);
commentRoute.post("/:postId", addComment);
commentRoute.delete("/:id", deleteComment);

export default commentRoute;
