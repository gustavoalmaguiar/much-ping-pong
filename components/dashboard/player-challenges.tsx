"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";
import { useGetPlayerChallenges } from "@/utils/hooks/use-get-player-challenges";
import PlayerChallengesSkeleton from "@/components/dashboard/player-challenges-skeleton";
import PlayerChallengesError from "@/components/dashboard/player-challenges-error";
import Link from "next/link";
import { CompactChallengeCard } from "@/components/dashboard/player-challenge-card";

export default function PlayerChallenges() {
  const { data: challenges, isLoading } = useGetPlayerChallenges();

  if (isLoading) return <PlayerChallengesSkeleton />;
  if (!challenges || "error" in challenges) return <PlayerChallengesError />;

  return (
    <Card>
      <CardHeader>
        <Link href="/challenges" className="hover:underline">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            Active Challenges
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent>
        {challenges.length === 0 ? (
          <p className="text-sm text-zinc-500">No active challenges</p>
        ) : (
          <div className="space-y-8 p-2">
            {challenges.map((challenge) => (
              <CompactChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
