import { Router } from "express";
import { clearkWebhook } from "../controllers/webhook.controller.js";
import bodyParser from "body-parser";

const clerkWebhook = Router();
clerkWebhook.post(
  "/clerk",
  bodyParser.raw({ type: "application/json" }),
  clearkWebhook
);
export default clerkWebhook;
