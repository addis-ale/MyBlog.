import { Router } from "express";

import postRoute from "./post.route.js";
import commentRoute from "./comment.route.js";
import savePostRoute from "./savePost.route.js";
const rootRoute = Router();

rootRoute.use("/posts", postRoute);
rootRoute.use("/comments", commentRoute);
rootRoute.use("/save-post", savePostRoute);
export default rootRoute;
