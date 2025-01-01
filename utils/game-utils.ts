export function calculateLevel(xp: number): number {
  // Each level requires 100 XP
  return Math.floor(xp / 100) + 1;
}

export function calculateXPForNextLevel(level: number): number {
  return level * 100;
}

export function calculateWinRate(wins: number, losses: number): number {
  if (wins + losses === 0) return 0;
  return Math.round((wins / (wins + losses)) * 100);
}

export function calculateMatchXP(
  winnerScore: number,
  loserScore: number,
): number {
  // Base XP for winning a match
  const baseXP = 20;

  // Calculate score difference bonus
  // More XP for closer matches to reward competitive play
  const scoreDifference = winnerScore - loserScore;
  const closeMatchBonus = Math.max(0, 10 - scoreDifference); // Up to 10 bonus XP for close matches

  // Perfect game bonus (11-0)
  const perfectGameBonus = winnerScore === 11 && loserScore === 0 ? 15 : 0;

  // Comeback bonus (winning with score < 11)
  const comebackBonus = winnerScore < 11 ? 5 : 0;

  // Calculate total XP
  const totalXP = baseXP + closeMatchBonus + perfectGameBonus + comebackBonus;

  return totalXP;
}
