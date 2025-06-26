import { Webhook } from "svix";
import prisma from "../lib/prismadb.js";
export const clearkWebhook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error("Webhook secret needed!");
  }
  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    res.status(400).json({ message: "webhook verification failed" });
  }

  // Do something with the evt...
  //console.log(evt.data);
  //TODO: creating a new user to our database
  if (evt.type === "user.created") {
    const newUser = await prisma.user.create({
      data: {
        clerkUserId: evt.data.id,
        username:
          evt.data.username || evt.data.email_addresses[0].email_address,
        email: evt.data.email_addresses[0].email_address,
        img: evt.data.profile_image_url,
      },
    });
    res.status(201).json(newUser);
  }
  //TODO: deleting a user from our database
  if (evt.type === "user.deleted") {
    const deletedUser = await prisma.user.findFirst({
      where: {
        clerkUserId: evt.data.id,
      },
    });

    if (!deletedUser) {
      return res.status(404).json({ message: "no user found to delete" });
    }

    await prisma.user.delete({ where: { id: deletedUser.id } });
    return res.status(200).json({ message: "user deleted" });
  }
  //TODO: user update
  if (evt.type === "user.updated") {
    const updatdUser = await prisma.user.findFirst({
      where: {
        clerkUserId: evt.data.id,
      },
    });
    await prisma.user.update({
      where: {
        id: updatdUser.id,
      },
      data: {
        username:
          evt.data.username || evt.data.email_addresses[0].email_address,
        email: evt.data.email_addresses[0].email_address,
        img: evt.data.profile_image_url,
      },
    });
    res.status(200).json("User updated successfully");
  }
};
