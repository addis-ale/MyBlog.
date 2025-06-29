import ImageKit from "imagekit";
import prisma from "../lib/prismadb.js";
import { createPostSchema } from "../models/post.js";
const slugify = (title) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // collapse multiple dashes

const generateUniqueSlug = (title) => {
  const baseSlug = slugify(title);
  const uniquePart = Date.now();
  return `${baseSlug}-${uniquePart}`;
};
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
  const slug = generateUniqueSlug(req.body.title);
  const newPost = await prisma.post.create({
    data: {
      ...req.body,
      slug,
      userId: user.id,
    },
  });
  res.status(200).json({ message: "post created successfully", post: newPost });
};
export const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.page) || 5;
  const posts = await prisma.post.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
    },
  });
  const totalPost = await prisma.post.count();
  const hasMore = limit * page < totalPost;
  res.status(200).json({ posts, hasMore });
};
export const getPost = async (req, res) => {
  const { slug } = req.params;
  const post = await prisma.post.findFirst({
    where: {
      slug,
    },
    include: {
      user: true,
      savedBy: true,
    },
  });
  res.status(200).json(post);
};
export const deletePost = async (req, res) => {
  const clerkUserId = req.auth().userId;
  const postId = +req.params.id;
  if (!clerkUserId) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  const role = req.auth()?.sessionClaims?.metadata?.role || "user";

  if (role === "admin") {
    await prisma.post.delete({
      where: { id: postId },
    });
    return res.status(200).json({ message: "Post deleted successfully" });
  } else {
    const user = await prisma.user.findFirst({
      where: {
        clerkUserId,
      },
    });
    const postToDeleted = await prisma.post.findFirst({
      where: {
        id: postId,
        userId: user.id,
      },
    });
    if (!postToDeleted) {
      return res.status(403).json({ message: "No post found to be deleted" });
    }
    await prisma.post.delete({
      where: { id: postId },
    });
    return res.status(200).json({ message: "Post deleted successfully" });
  }
};
export const featurePost = async (req, res) => {
  const clerkUserId = req.auth().userId;
  const postId = req.body.postId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const role = req.auth().sessionClaims?.metadata?.role || "user";

  if (role !== "admin") {
    return res.status(403).json("You cannot feature posts!");
  }

  const post = await prisma.post.findFirst({
    where: {
      id: postId,
    },
  });

  if (!post) {
    return res.status(404).json("Post not found!");
  }

  const isFeatured = post.isFeaturd;

  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      isFeaturd: !isFeatured,
    },
  });

  res.status(200).json(updatedPost);
};
const imagekit = new ImageKit({
  urlEndpoint: process.env.IK_URL_ENDPOINT,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
});
export const uploadAuth = async (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.json(result);
};
