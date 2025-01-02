"use server";

import { auth } from "@/auth";
import { fetchPlayerProfile } from "@/utils/queries";

export const getPlayerStats = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return { error: "User not found in session" };
  }
  try {
    const player = await fetchPlayerProfile(userId);
    if (!player) {
      return { error: "Player not found" };
    }
    return player;
  } catch (error) {
    console.error("[PLAYER_STATS_GET]", error);
    return { error: "Failed to fetch player stats" };
  }
};
