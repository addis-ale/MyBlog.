import prisma from "../lib/prismadb.js";

export const addComment = async (req, res) => {
  const clerkUserId = req.auth().userId;
  const postId = parseInt(req.params.postId);

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }
  const user = await prisma.user.findFirst({
    where: { clerkUserId },
  });

  const newComment = await prisma.comment.create({
    data: {
      ...req.body,
      userId: user.id,
      postId: postId,
    },
  });
  res.status(200).json(newComment);
};
export const getPostComments = async (req, res) => {
  const postId = parseInt(req.params.postId);

  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: {
        select: {
          username: true,
          img: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  res.status(200).json(comments);
};
export const deleteComment = async (req, res) => {
  try {
    const clerkUserId = req.auth().userId;
    const id = parseInt(req.params.id);
    const role = req.auth()?.sessionClaims?.metadata?.role || "user";

    if (role === "admin") {
      await prisma.comment.delete({
        where: { id },
      });
      return res.status(200).json({ message: "Comment deleted successfully." });
    }

    const user = await prisma.user.findFirst({
      where: { clerkUserId },
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found or not authenticated." });
    }

    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    if (comment.userId !== user.id) {
      return res
        .status(403)
        .json({ message: "You can't delete someone else's comment." });
    }

    await prisma.comment.delete({
      where: { id },
    });

    return res.status(200).json({ message: "Comment deleted successfully." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error while deleting comment." });
  }
};
