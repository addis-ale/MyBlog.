import prisma from "../lib/prismadb.js";

export const getMySavedPosts = async (req, res) => {
  const clerkUserId = req.auth().userId;
  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }
  const user = await prisma.user.findFirst({
    where: { clerkUserId },
  });
  const mySavedPosts = await prisma.savedPost.findMany({
    where: {
      userId: user.id,
    },
  });
  return res.status(200).json(mySavedPosts);
};
export const savePost = async (req, res) => {
  const clerkUserId = req.auth().userId;
  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const postId = parseInt(req.params.id);
  const user = await prisma.user.findFirst({
    where: { clerkUserId },
  });

  if (!user) {
    return res.status(404).json("User not found!");
  }

  const isSaved = await prisma.savedPost.findFirst({
    where: {
      postId,
      userId: user.id,
    },
  });

  if (isSaved) {
    await prisma.savedPost.delete({
      where: {
        id: isSaved.id,
      },
    });
    return res.status(200).json({ message: "Post unsaved.", type: "unSaved" });
  } else {
    const newSavedPost = await prisma.savedPost.create({
      data: {
        postId,
        userId: user.id,
      },
    });
    return res.status(201).json({ message: "Post saved", type: "saved" });
  }
};

// export const deleteSavedPost = async (req, res) => {
//   const clerkUserId = req.auth().userId;
//   const postId = parseInt(req.params.id);
//   if (!clerkUserId) {
//     res.status(401).json({
//       message: "Not authorized!",
//     });
//   }
//   const user = await prisma.user.findFirst({
//     where: {
//       clerkUserId,
//     },
//   });
//   const postToDelete = await prisma.post.findFirst({
//     where: {
//       id: postId,
//       userId: user.id,
//     },
//   });
//   if (!postToDelete) {
//     res.status(404).json("No post found to delete!");
//   }
//   const deletedPost = await prisma.post.delete({
//     where: {
//       id: postToDelete.id,
//     },
//   });
//   res.status(200).json({
//     message: "Post deleted successfully!",
//     deletedPost: deletedPost,
//   });
// };
