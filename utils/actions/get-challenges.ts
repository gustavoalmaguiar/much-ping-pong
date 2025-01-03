"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";

export const getChallenges = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "User not found in session" };
  }

  try {
    const challenges = await prisma.challenge.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        requirementType: true,
        requirementValue: true,
        xpReward: true,
        isActive: true,
        createdAt: true,
      },
    });
    return challenges;
  } catch (error) {
    console.error("[CHALLENGES_GET]", error);
    return { error: "Failed to fetch challenges" };
  }
};
