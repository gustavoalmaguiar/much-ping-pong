"use client";

import { useGetRecentMatches } from "@/utils/hooks/use-get-recent-matches";
import RecentMatchesSkeleton from "@/components/dashboard/recent-matches-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNowStrict } from "date-fns";
import { History } from "lucide-react";

interface Player {
  id: string;
  name: string;
  imageUrl: string | null;
}

interface Match {
  id: string;
  type: "singles" | "duo";
  winners: Player[];
  losers: Player[];
  winnerScore: number;
  loserScore: number;
  createdAt: Date;
}

function PlayerAvatar({ player }: { player: Player }) {
  return (
    <Avatar className="h-8 w-8 border-2 border-background">
      <AvatarImage src={player.imageUrl ?? undefined} alt={player.name} />
      <AvatarFallback>{player.name[0]}</AvatarFallback>
    </Avatar>
  );
}

function MatchItem({ match }: { match: Match }) {
  const score = `${match.winnerScore}-${match.loserScore}`;
  const timeAgo = formatDistanceToNowStrict(new Date(match.createdAt), {
    addSuffix: true,
  });

  return (
    <div className="flex items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="w-[68px]">
        {match.type === "singles" ? (
          <div>
            <PlayerAvatar player={match.winners[0]} />
          </div>
        ) : (
          <div className="flex justify-start -space-x-3">
            {match.winners.map((winner) => (
              <PlayerAvatar key={winner.id} player={winner} />
            ))}
          </div>
        )}
      </div>

      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium truncate">
            {match.type === "singles"
              ? match.winners[0].name
              : `${match.winners[0].name} & ${match.winners[1].name}`}
          </p>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Trophy className="h-3.5 w-3.5 text-yellow-500" />
            {match.type === "duo" && (
              <Users2 className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </div>
        </div>
        <p className="text-sm text-muted-foreground truncate">
          vs{" "}
          {match.type === "singles"
            ? match.losers[0].name
            : `${match.losers[0].name} & ${match.losers[1].name}`}
        </p>
      </div>

      <div className="w-[80px] text-right flex-shrink-0">
        <p className="text-sm font-medium">{score}</p>
        <p className="text-xs text-muted-foreground">{timeAgo}</p>
      </div>
    </div>
  );
}

export default function RecentMatches() {
  const { data: matches, isLoading } = useGetRecentMatches();

  if (isLoading) return <RecentMatchesSkeleton />;
  if (matches && "error" in matches) {
    console.error("[RECENT_MATCHES]", matches.error);
    return null;
  }
  if (!matches) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <History className="h-5 w-5" />
          Recent Matches
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {matches.map((match) => (
            <MatchItem key={match.id} match={match} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
