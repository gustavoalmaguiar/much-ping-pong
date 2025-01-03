"use client";

import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Challenge, PlayerChallenge } from "@/types/challenges";
import { ChallengeCard } from "@/components/challenges/challenge-card";

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
    const aProgress =
      playerChallenges.find((pc) => pc.challengeId === a.id)?.progress || 0;
    const bProgress =
      playerChallenges.find((pc) => pc.challengeId === b.id)?.progress || 0;
    return bProgress / b.requirementValue - aProgress / a.requirementValue;
  });

  return (
    <div className="space-y-6">
      {sortedChallenges.slice(0, visibleChallenges).map((challenge) => {
        const playerChallenge = playerChallenges.find(
          (pc) => pc.challengeId === challenge.id,
        );
        const currentValue = playerChallenge ? playerChallenge.progress : 0;
        const percentage = Math.round(
          (currentValue / challenge.requirementValue) * 100,
        );

        return (
          <ChallengeCard
            key={challenge.id}
            currentValue={currentValue}
            percentage={percentage}
            challenge={challenge}
          />
        );
      })}
      {visibleChallenges < challenges.length && (
        <div className="text-center mt-6">
          <Button
            onClick={() => setVisibleChallenges((prev) => prev + 10)}
            variant="outline"
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
