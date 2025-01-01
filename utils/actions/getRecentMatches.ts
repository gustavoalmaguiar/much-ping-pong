"use server";

import { auth } from "@/auth";
import { fetchMostRecentMatches } from "@/utils/queries";

export const getRecentMatches = async () => {
  const session = await auth();
  if (!session) {
    return { error: "Session not found" };
  }
  try {
    return await fetchMostRecentMatches(5);
  } catch (error) {
    console.error("[RECENT_MATCHES_GET]", error);
    return { error: "Failed to fetch recent matches" };
  }
};
