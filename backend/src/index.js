import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import imageKit from "imagekit";
import rootRoute from "./routes/rootRoute.route.js";
import clerkWebhook from "./routes/webhook.route.js";
import { clerkMiddleware } from "@clerk/express";
import { errorMiddleware } from "./middlewares/error.js";
dotenv.config();
const app = express();
app.use(cors({}));
app.use(clerkMiddleware());
app.use("/api/webhook", clerkWebhook);
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const PORT = process.env.PORT;
app.use("/api", rootRoute);
app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT} `);
});
