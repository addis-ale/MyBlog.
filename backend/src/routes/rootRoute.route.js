import { Router } from "express";

import postRoute from "./post.route.js";
const rootRoute = Router();

rootRoute.use("/posts", postRoute);
export default rootRoute;
