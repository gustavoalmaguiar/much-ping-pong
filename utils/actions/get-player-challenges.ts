"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";

export const getPlayerChallenges = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "User not found in session" };
  }

  try {
    const playerChallenges = await prisma.playerChallenge.findMany({
      where: {
        playerId: userId,
        completed: false,
        challenge: {
          isActive: true,
        },
      },
      include: {
        challenge: true,
      },
      orderBy: {
        progress: "desc",
      },
      take: 2,
    });

    return playerChallenges.map((pc) => ({
      id: pc.challengeId,
      title: pc.challenge.title,
      description: pc.challenge.description,
      progress: pc.progress,
      requirementValue: pc.challenge.requirementValue,
      xpReward: pc.challenge.xpReward,
    }));
  } catch (error) {
    console.error("[PLAYER_CHALLENGES_GET]", error);
    return { error: "Failed to fetch player challenges" };
  }
};
