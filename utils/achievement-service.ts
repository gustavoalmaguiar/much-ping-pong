import prisma from "@/lib/db";

export async function evaluateAchievements(
  playerId: string,
  isWinner: boolean,
  tx: any,
) {
  const db = tx || prisma;
  const player = await db.user.findUnique({ where: { id: playerId } });

  // Fetch only relevant challenges for this player
  const activeChallenges = await db.challenge.findMany({
    where: {
      isActive: true,
      playerChallenges: {
        none: {
          playerId: playerId,
          completed: true,
        },
      },
    },
  });

  for (const challenge of activeChallenges) {
    let progress = 0;
    let completed = false;
    console.log("Checking challenge", challenge);
    switch (challenge.requirementType) {
      case "winStreak":
        if (isWinner && player?.currentStreak) {
          progress = player.currentStreak;
          if (progress >= challenge.requirementValue) {
            completed = true;
          }
        }
        break;

      case "winCount":
        if (isWinner) {
          progress = await db.match.count({
            where: { winners: { some: { id: playerId } } },
          });
          if (progress >= challenge.requirementValue) {
            completed = true;
          }
        }
        break;

      case "lossCount":
        if (!isWinner) {
          progress = await db.match.count({
            where: { losers: { some: { id: playerId } } },
          });
          if (progress >= challenge.requirementValue) {
            completed = true;
          }
        }
        break;

      case "xpGain":
        progress = player?.xp || 0;
        if (progress >= challenge.requirementValue) {
          completed = true;
        }
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
        if (progress >= challenge.requirementValue) {
          completed = true;
        }
        break;

      case "matchTypeCount":
        progress = await db.match.count({
          where: {
            OR: [
              { winners: { some: { id: playerId } } },
              { losers: { some: { id: playerId } } },
            ],
            type: challenge.matchType,
          },
        });
        if (progress >= challenge.requirementValue) {
          completed = true;
        }
        break;

      default:
        console.warn(`Unknown requirement type: ${challenge.requirementType}`);
    }

    await db.playerChallenge.upsert({
      where: { playerId_challengeId: { playerId, challengeId: challenge.id } },
      update: { progress, completed },
      create: {
        playerId,
        challengeId: challenge.id,
        progress,
        completed,
      },
    });

    if (completed && challenge.xpReward > 0) {
      await db.user.update({
        where: { id: playerId },
        data: { xp: { increment: challenge.xpReward } },
      });
    }
  }
}
