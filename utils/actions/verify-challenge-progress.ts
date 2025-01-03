import prisma from "@/lib/db";
import { PlayerChallenge } from "@prisma/client";

export async function verifyPlayerChallengeProgress(
  playerId: string,
  challengeId?: string,
  tx?: any,
) {
  const db = tx || prisma;
  // Get either a specific challenge or all active challenges
  const challenges = await db.challenge.findMany({
    where: {
      ...(challengeId ? { id: challengeId } : {}),
      isActive: true,
    },
  });

  const player = await db.user.findUnique({ where: { id: playerId } });
  if (!player) return;

  const updates: Promise<PlayerChallenge>[] = [];

  for (const challenge of challenges) {
    let progress = 0;
    let completed = false;

    // Calculate current progress based on challenge type
    console.log("Checking challenge", challenge);
    switch (challenge.requirementType) {
      case "winStreak":
        progress = player.currentStreak || 0;
        completed = progress >= challenge.requirementValue;
        break;

      case "winCount":
        progress = await db.match.count({
          where: { winners: { some: { id: playerId } } },
        });
        completed = progress >= challenge.requirementValue;
        break;

      case "lossCount":
        progress = await db.match.count({
          where: { losers: { some: { id: playerId } } },
        });
        completed = progress >= challenge.requirementValue;
        break;

      case "xpGain":
        progress = player.xp;
        completed = progress >= challenge.requirementValue;
        break;

      case "playMatches":
        progress = await db.match.count({
          where: {
            OR: [
              { winners: { some: { id: playerId } } },
              { losers: { some: { id: playerId } } },
            ],
          },
        });
        completed = progress >= challenge.requirementValue;
        break;

      case "matchTypeCount":
        console.log("Checking match type", challenge.matchType);
        console.log("Checking player", playerId);
        progress = await db.match.count({
          where: {
            OR: [
              { winners: { some: { id: playerId } } },
              { losers: { some: { id: playerId } } },
            ],
            type: challenge.matchType,
          },
        });
        console.log("Progress", progress);
        completed = progress >= challenge.requirementValue;
        break;
    }

    // Update the player challenge record
    updates.push(
      db.playerChallenge.upsert({
        where: {
          playerId_challengeId: { playerId, challengeId: challenge.id },
        },
        update: { progress, completed },
        create: {
          playerId,
          challengeId: challenge.id,
          progress,
          completed,
        },
      }),
    );

    // If newly completed, award XP
    if (completed && challenge.xpReward > 0) {
      await db.user.update({
        where: { id: playerId },
        data: { xp: { increment: challenge.xpReward } },
      });
    }
  }

  // Execute all updates in parallel
  await Promise.all(updates);
}
