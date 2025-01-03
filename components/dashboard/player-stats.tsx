"use client";

import PlayerStatsSkeleton from "@/components/dashboard/player-stats-skeleton";
import { calculateLevel, calculateXPForNextLevel, getLevelTier } from "@/utils/game-utils";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, Zap } from "lucide-react";
import { useGetPlayerStats } from "@/utils/hooks/use-get-player-stats";

export default function PlayerStats() {
  const { data: profile, isLoading } = useGetPlayerStats();
  if (isLoading) return <PlayerStatsSkeleton />;
  if (profile && "error" in profile) {
    console.error("[PLAYER_STATS]", profile.error);
    return null;
  }
  if (!profile) return null;

  const level = calculateLevel(profile.xp);
  const currentLevelXP = calculateXPForNextLevel(level - 1);
  const nextLevelXP = calculateXPForNextLevel(level);
  const levelProgress =
    ((profile.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
  const name = profile ? profile.name ?? "Player" : "Player";
  const tier = getLevelTier(level);
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-primary">
            <AvatarImage
              src={profile.image ?? undefined}
              alt={name}
            />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className="grid">
            <h2 className="text-lg font-semibold">{profile.name}</h2>
            <div className="text-sm text-muted-foreground">{tier}</div>
          </div>
        </div>
        <div className="mt-4 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">XP Progress</span>
              <span className="font-medium">
                {profile.xp} / {nextLevelXP} XP
              </span>
            </div>
            <Progress value={levelProgress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Level {level}</span>
              <span>Level {level + 1}</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <Trophy className="mx-auto h-5 w-5 text-yellow-500" />
              <div className="text-xl font-bold">{profile.wins}</div>
              <div className="text-xs text-muted-foreground">Wins</div>
            </div>
            <div className="space-y-1">
              <Target className="mx-auto h-5 w-5 text-red-500" />
              <div className="text-xl font-bold">{profile.losses}</div>
              <div className="text-xs text-muted-foreground">Losses</div>
            </div>
            <div className="space-y-1">
              <Zap className="mx-auto h-5 w-5 text-blue-500" />
              <div className="text-xl font-bold">{profile.currentStreak}</div>
              <div className="text-xs text-muted-foreground">Streak</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
