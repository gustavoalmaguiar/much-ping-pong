export interface Player {
  id: string;
  name: string;
  image?: string;
}

export type PlayerDTO = {
  id: string;
  name: string | null;
  rank: number;
  level: number;
  xp: number;
  winRate: number;
  wins: number;
  losses: number;
};
