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
  matchType?: MatchType;
}

export interface PlayerChallenge {
  id: string;
  challengeId: string;
  progress: number;
  completed: boolean;
}

export type NewChallenge = Omit<Challenge, "id" | "createdAt"> & {
  matchType: MatchType | null;
};
