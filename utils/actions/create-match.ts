"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { calculateMatchXP } from "@/utils/game-utils";
import type { MatchType } from "@prisma/client";
import { auth } from "@/auth";

interface CreateMatchParams {
  type: "singles" | "duo";
  winnerIds: string[];
  loserIds: string[];
  winnerScore: number;
  loserScore: number;
}

export async function createMatch({
  type,
  winnerIds,
  loserIds,
  winnerScore,
  loserScore,
}: CreateMatchParams) {
  try {
    const match = await prisma.$transaction(async (tx) => {
      // 1. Create the match
      const match = await tx.match.create({
        data: {
          type: type as MatchType,
          winnerScore,
          loserScore,
          winners: {
            connect: winnerIds.map((id) => ({ id })),
          },
          losers: {
            connect: loserIds.map((id) => ({ id })),
          },
        },
        include: {
          winners: true,
          losers: true,
        },
      });

      // 2. Calculate XP and update stats
      const xpGained = calculateMatchXP(winnerScore, loserScore);

      // 3. Update winners
      await Promise.all(
        winnerIds.map(async (id) => {
          const player = await tx.player.findUnique({ where: { id } });
          const newStreak = (player?.currentStreak ?? 0) + 1;

          return tx.player.update({
            where: { id },
            data: {
              xp: { increment: xpGained },
              wins: { increment: 1 },
              currentStreak: { increment: 1 },
              longestStreak: Math.max(newStreak, player?.longestStreak ?? 0),
            },
          });
        }),
      );

      // 4. Update losers
      await Promise.all(
        loserIds.map((id) =>
          tx.player.update({
            where: { id },
            data: {
              losses: { increment: 1 },
              currentStreak: 0,
            },
          }),
        ),
      );

      return match;
    });

    revalidatePath("/dashboard");
    return match;
  } catch (error) {
    console.error("Error creating match:", error);
    throw new Error("Failed to create match");
  }
}
