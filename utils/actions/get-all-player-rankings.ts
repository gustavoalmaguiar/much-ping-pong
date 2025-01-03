"use server";

import prisma from "@/lib/db";
import { calculateLevel } from "../game-utils";

export async function getAllPlayerRankings() {
  try {
    const players = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        xp: true,
        wins: true,
        losses: true,
      },
      orderBy: {
        xp: "desc",
      },
    });

    // Calculate win rate and level for each player
    const playersWithWinRateAndLevel = players.map((player, index) => ({
      ...player,
      rank: index + 1,
      level: calculateLevel(player.xp),
      winRate: Math.round((player.wins / (player.wins + player.losses)) * 100 || 0),
    }));

    return playersWithWinRateAndLevel;
  } catch (error) {
    console.error("Error fetching player rankings:", error);
    throw new Error("Failed to fetch player rankings");
  }
}
