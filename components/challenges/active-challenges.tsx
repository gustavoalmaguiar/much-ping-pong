"use client";

import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Challenge, PlayerChallenge } from "@/types/challenges";

interface ActiveChallengesProps {
  challenges: Challenge[];
  playerChallenges: PlayerChallenge[];
}

export function ActiveChallenges({
  challenges,
  playerChallenges,
}: ActiveChallengesProps) {
  const [visibleChallenges, setVisibleChallenges] = useState(10);

  if (challenges.length === 0) {
    return <div className="text-muted-foreground">No active challenges</div>;
  }

  const sortedChallenges = [...challenges].sort((a, b) => {
    const aProgress = playerChallenges.find(pc => pc.challengeId === a.id)?.progress || 0;
    const bProgress = playerChallenges.find(pc => pc.challengeId === b.id)?.progress || 0;
    return (bProgress / b.requirementValue) - (aProgress / a.requirementValue);
  });

  return (
    <div className="space-y-8">
      {sortedChallenges.slice(0, visibleChallenges).map((challenge) => {
        const playerChallenge = playerChallenges.find(
          (pc) => pc.challengeId === challenge.id
        );
        const progress = playerChallenge ? playerChallenge.progress : 0;
        const percentage = Math.round(
          (progress / challenge.requirementValue) * 100
        );

        return (
          <div key={challenge.id} className="bg-muted p-6 rounded-lg space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{challenge.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {challenge.description}
                </p>
              </div>
              <div className="text-lg font-medium text-blue-500">
                +{challenge.xpReward} XP
              </div>
            </div>
            <div className="space-y-2">
              <Progress value={percentage} className="h-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  {progress} / {challenge.requirementValue}
                </span>
                <span>{percentage}%</span>
              </div>
            </div>
          </div>
        );
      })}
      {visibleChallenges < challenges.length && (
        <div className="text-center mt-6">
          <Button
            onClick={() => setVisibleChallenges(prev => prev + 10)}
            variant="outline"
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}

