"use server";

import prisma from "@/lib/db";

export async function getAllPlayers() {
  try {
    const players = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        image: true,
      },
      orderBy: {
        xp: "desc",
      },
    });

    return players;
  } catch (error) {
    console.error("Error fetching players:", error);
    throw new Error("Failed to fetch players");
  }
}
