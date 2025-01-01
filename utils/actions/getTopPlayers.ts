"use server";

import { auth } from "@/auth";
import { fetchTopPlayers } from "@/utils/queries";

export const getTopPlayers = async () => {
  const session = await auth();
  if (!session) {
    return { error: "Session not found" };
  }
  try {
    return await fetchTopPlayers(3);
  } catch (error) {
    console.error("[TOP_PLAYERS]", error);
    return { error: "Failed to fetch top players" };
  }
};
