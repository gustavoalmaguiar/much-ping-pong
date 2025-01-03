import { RequirementType } from "@prisma/client";

export enum MatchType {
  singles = "singles",
  duo = "duo",
}

export const requirementTypeMap: Record<RequirementType, string> = {
  winStreak: "Win Streak",
  winCount: "Total Wins",
  lossCount: "Total Losses",
  xpGain: "XP Gain",
  playMatches: "Play Matches",
  specificWin: "Specific Win Against a Player",
  matchTypeCount: "Match Type Count",
};

export interface Player {
  id: string;
  name: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  requirementType: RequirementType;
  requirementValue: number;
  xpReward: number;
  isActive: boolean;
  condition?: {
    opponent?: string;
    matchType?: MatchType;
  } | string;
}

export interface PlayerChallenge {
  id: string;
  challengeId: string;
  progress: number;
  completed: boolean;
}

