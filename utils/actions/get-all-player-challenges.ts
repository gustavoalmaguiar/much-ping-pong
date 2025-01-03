"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";

export const getAllPlayerChallenges = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "User not found in session" };
  }

  try {
    const playerChallenges = await prisma.playerChallenge.findMany({
      where: {
        playerId: userId,
      },
      select: {
        id: true,
        challengeId: true,
        completed: true,
        progress: true,
        challenge: {
          select: {
            title: true,
            description: true,
            requirementValue: true,
            xpReward: true,
          },
        },
      },
    });
    return playerChallenges;
  } catch (error) {
    console.error("[PLAYER_CHALLENGES_GET]", error);
    return { error: "Failed to fetch player challenges" };
  }
};
