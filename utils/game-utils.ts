/**
 * Calculates the player's level based on total XP using a progressive scaling system.
 * The XP required for each level increases with each tier:
 * - Levels 1-10: 100 XP per level
 * - Levels 11-20: 150 XP per level
 * - Levels 21-30: 225 XP per level
 * - Levels 31+: 340 XP per level
 *
 * @param xp - Total experience points
 * @returns Current level number
 */
export function calculateLevel(xp: number): number {
  const tier1 = 10 * 100;  // First 10 levels need 100 XP each
  const tier2 = 10 * 150;  // Next 10 levels need 150 XP each
  const tier3 = 10 * 225;  // Next 10 levels need 225 XP each

  if (xp < tier1) {
    return Math.floor(xp / 100) + 1;
  } else if (xp < tier1 + tier2) {
    return Math.floor((xp - tier1) / 150) + 11;
  } else if (xp < tier1 + tier2 + tier3) {
    return Math.floor((xp - tier1 - tier2) / 225) + 21;
  } else {
    return Math.floor((xp - tier1 - tier2 - tier3) / 340) + 31;
  }
}

/**
 * Calculates the XP required to reach the next level.
 * Returns the total XP threshold for the next level based on the current level's tier.
 *
 * @param level - Current level
 * @returns XP required for next level
 */
export function calculateXPForNextLevel(level: number): number {
  if (level <= 10) return level * 100;
  if (level <= 20) return 1000 + (level - 10) * 150;
  if (level <= 30) return 2500 + (level - 20) * 225;
  return 4750 + (level - 30) * 340;
}

/**
 * Calculates win rate percentage with 0% as minimum.
 *
 * @param wins - Total wins
 * @param losses - Total losses
 * @returns Win rate percentage (0-100)
 */
export function calculateWinRate(wins: number, losses: number): number {
  if (wins + losses === 0) return 0;
  return Math.round((wins / (wins + losses)) * 100);
}

/**
 * Calculates XP earned for both winner and loser in a match.
 * XP is awarded based on several factors:
 *
 * Winner XP Factors:
 * - Base XP: 20 XP for winning
 * - Close Match Bonus: Up to 10 XP for matches with small score differences
 * - Perfect Game Bonus: 15 XP for winning 11-0
 * - Comeback Bonus: 5 XP for winning with score < 11
 *
 * Loser XP Factors:
 * - Base XP: 10 XP for participating
 * - Fighting Spirit Bonus: Up to 8 XP for scoring points
 * - Close Match Bonus: Up to 7 XP for nearly winning
 *
 * @param winnerScore - Winner's final score
 * @param loserScore - Loser's final score
 * @returns Object containing XP for both winner and loser
 */
export function calculateMatchXP(
  winnerScore: number,
  loserScore: number,
): { winnerXP: number; loserXP: number } {
  // Winner XP Calculation
  const baseXP = 20;
  const scoreDifference = winnerScore - loserScore;
  const closeMatchBonus = Math.max(0, 10 - scoreDifference); // Up to 10 XP for close matches
  const perfectGameBonus = winnerScore === 11 && loserScore === 0 ? 15 : 0;
  const comebackBonus = winnerScore < 11 ? 5 : 0;

  const winnerXP = baseXP + closeMatchBonus + perfectGameBonus + comebackBonus;

  // Loser XP Calculation
  const loserBaseXP = 10; // Base XP for participating
  const fightingSpiritBonus = Math.min(8, Math.floor(loserScore * 0.8)); // Up to 8 XP based on points scored
  const loserCloseMatchBonus = scoreDifference <= 2 ? 7 : // 7 XP for extremely close matches
                              scoreDifference <= 4 ? 5 : // 5 XP for very close matches
                              scoreDifference <= 6 ? 3 : // 3 XP for moderately close matches
                              0; // No bonus for one-sided matches

  const loserXP = loserBaseXP + fightingSpiritBonus + loserCloseMatchBonus;

  return { winnerXP, loserXP };
}

/**
 * Returns the name of the level tier based on level number.
 * Used for displaying rank/status to players.
 *
 * @param level - Player's current level
 * @returns String representing the player's rank tier
 */
export function getLevelTier(level: number): string {
  if (level <= 10) return "Rookie";
  if (level <= 20) return "Challenger";
  if (level <= 30) return "Veteran";
  if (level <= 40) return "Elite";
  if (level <= 50) return "Master";
  return "Legend";
}
