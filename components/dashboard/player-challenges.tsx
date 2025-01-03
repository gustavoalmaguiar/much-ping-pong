"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Trophy } from "lucide-react";
import { useGetPlayerChallenges } from "@/utils/hooks/use-get-player-challenges";
import PlayerChallengesSkeleton from "@/components/dashboard/player-challenges-skeleton";
import PlayerChallengesError from "@/components/dashboard/player-challenges-error";
import Link from "next/link";

export default function PlayerChallenges() {
  const { data: challenges, isLoading } = useGetPlayerChallenges();

  if (isLoading) return <PlayerChallengesSkeleton />;
  if (!challenges || 'error' in challenges) return <PlayerChallengesError />;

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
          <div className="space-y-4 p-2">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium truncate max-w-[200px]">{challenge.title}</h3>
                  <div className="text-sm font-medium text-emerald-500">
                    +{challenge.xpReward} XP
                  </div>
                </div>
                <div className="space-y-2">
                  <Progress
                    value={(challenge.progress / challenge.requirementValue) * 100}
                    className="h-1.5"
                  />
                  <div className="flex justify-between text-sm text-zinc-400">
                    <span>
                      {challenge.progress} / {challenge.requirementValue}
                    </span>
                    <span>
                      {Math.round(
                        (challenge.progress / challenge.requirementValue) * 100
                      )}
                      %
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
