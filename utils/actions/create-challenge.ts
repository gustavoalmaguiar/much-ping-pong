"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { Challenge } from "@/types/challenges";
import { verifyPlayerChallengeProgress } from "@/utils/actions/verify-challenge-progress";

export const createChallenge = async (
  data: Omit<Challenge, "id" | "createdAt">,
) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "User not authenticated" };
  }

  // Verify user is admin
  const player = await prisma.user.findUnique({
    where: { id: userId },
    select: { isAdmin: true },
  });

  if (!player?.isAdmin) {
    return { error: "Unauthorized" };
  }

  try {
    // Use a transaction to ensure all operations succeed or fail together
    const result = await prisma.$transaction(async (tx) => {
      // Create the challenge
      const challenge = await tx.challenge.create({
        data: {
          title: data.title,
          description: data.description,
          requirementType: data.requirementType,
          requirementValue: data.requirementValue,
          matchType: data.matchType,
          xpReward: data.xpReward,
          isActive: data.isActive,
        },
      });

      // Get all active players
      const players = await tx.user.findMany({
        select: {
          id: true,
        },
      });

      // Create PlayerChallenge records for all players
      await tx.playerChallenge.createMany({
        data: players.map((player) => ({
          playerId: player.id,
          challengeId: challenge.id,
          progress: 0,
          completed: false,
        })),
      });

      // Verify initial progress for each player
      const verificationPromises = players.map((player) =>
        verifyPlayerChallengeProgress(player.id, challenge.id, tx),
      );

      // Wait for all verifications to complete
      await Promise.all(verificationPromises);

      return challenge;
    });

    return result;
  } catch (error) {
    console.error("[CHALLENGE_CREATE]", error);
    return { error: "Failed to create challenge" };
  }
};
