"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TopPlayersSkeleton from "@/components/dashboard/top-players-skeleton";
import { useGetTopPlayers } from "@/hooks/use-get-top-players";
import { Trophy } from "lucide-react";

interface TopPlayer {
  id: string;
  name: string;
  imageUrl: string | null;
  xp: number;
  wins: number;
  _count: {
    wonMatches: number;
  };
}

export default function TopPlayers() {
  const { data: topPlayers, isLoading } = useGetTopPlayers();

  if (isLoading) return <TopPlayersSkeleton />;
  if (topPlayers && "error" in topPlayers) {
    console.error("[TOP_PLAYERS]", topPlayers.error);
    return null;
  }
  if (!topPlayers) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="text-lg">Top Players</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {topPlayers.map((player: TopPlayer) => (
            <div key={player.id} className="flex items-center space-x-4 p-2 hover:bg-muted/50 transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={player.imageUrl ?? undefined}
                  alt={player.name}
                />
                <AvatarFallback>
                  {player.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="truncate">{player.name}</p>
                <p className="text-sm text-muted-foreground">
                  {player._count.wonMatches} wins
                </p>
              </div>
              <div className="text-sm font-medium">{player.xp} XP</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
