import "server-only";

import { clerkClient } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export const checkUser = async (clerkUserId) => {
  if (!clerkUserId) {
    return null;
  }

  try {
    const loggedInUser = await db?.user.findUnique({
      where: {
        clerkUserId: clerkUserId,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    // Get user details from Clerk
    const user = await clerkClient().users.getUser(clerkUserId);
    const name = `${user.firstName} ${user.lastName}`;

    await clerkClient().users.updateUser(user.id, {
      username: name.split(" ").join("-") + user.id.slice(-4),
    });

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
        username: name.split(" ").join("-") + user.id.slice(-4),
      },
    });

    return newUser;
  } catch (error) {
    console.log(error);
  }
};