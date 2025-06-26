import prisma from "../lib/prismadb.js";
import { createPostSchema } from "../models/post.js";

export const createPost = async (req, res, next) => {
  const clerkUserId = req.auth().userId;
  if (!clerkUserId) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  const user = await prisma.user.findFirst({
    where: {
      clerkUserId,
    },
  });
  //TODO: needs zod validation to create a post
  createPostSchema.parse(req.body);
  const newPost = await prisma.post.create({
    data: {
      ...req.body,
      userId: user.id,
    },
  });
  res.status(200).json({ message: "post created successfully" });
};
export const getPosts = async (req, res) => {};
export const getPost = async (req, res) => {};
export const deletePost = async (req, res) => {
  const clerkUserId = req.auth().userId;
  if (!clerkUserId) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  const user = await prisma.user.findFirst({
    where: {
      clerkUserId,
    },
  });
  const postId = +req.params.id;
  console.log("post id", postId);
  const postToDeleted = await prisma.post.findFirst({
    where: {
      id: postId,
    },
  });
  if (!postToDeleted || postToDeleted.userId !== user.id) {
    return res
      .status(403)
      .json({ message: "Not authorized to delete this post" });
  }
  await prisma.post.delete({
    where: { id: postId },
  });

  return res.status(200).json({ message: "Post deleted successfully" });
};
export const featurePost = async (req, res) => {};
