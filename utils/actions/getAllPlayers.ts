"use server";

import prisma from "@/lib/db";

export async function getAllPlayers() {
  try {
    const players = await prisma.player.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return players;
  } catch (error) {
    console.error("Error fetching players:", error);
    throw new Error("Failed to fetch players");
  }
}
