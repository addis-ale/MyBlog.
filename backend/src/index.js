import express from "express";
import dotenv from "dotenv";
import rootRoute from "./routes/rootRoute.route.js";
import clerkWebhook from "./routes/webhook.route.js";
import { clerkMiddleware } from "@clerk/express";
import { errorMiddleware } from "./middlewares/error.js";
dotenv.config();
const app = express();
app.use(clerkMiddleware());
app.use("/api/webhook", clerkWebhook);
app.use(express.json());
const PORT = process.env.PORT;
app.use("/api", rootRoute);
app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT} `);
});
