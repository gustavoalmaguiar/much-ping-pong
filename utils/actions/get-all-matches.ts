"use server";

import { auth } from "@/auth";
import { fetchAllMatches } from "../queries";

export async function getAllMatches() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not found in session");
  }

  try {
    const initialMatches = await fetchAllMatches();
    // Add the score for each match based on winner and loser score.
    const matches = initialMatches.map((match) => {
      const winnerScore = match.winnerScore;
      const loserScore = match.loserScore;
      return {
        ...match,
        score: `${winnerScore}-${loserScore}`,
      };
    });
    return matches;
  } catch (error) {
    console.error("Error fetching all matches:", error);
    throw new Error("Failed to fetch all matches");
  }
}
