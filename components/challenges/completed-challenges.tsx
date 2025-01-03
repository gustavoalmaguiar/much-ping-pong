"use client";

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Challenge, PlayerChallenge } from "@/types/challenges";

interface CompletedChallengesProps {
  challenges: Challenge[];
  playerChallenges: PlayerChallenge[];
}

export function CompletedChallenges({
  challenges,
  playerChallenges,
}: CompletedChallengesProps) {
  const [visibleChallenges, setVisibleChallenges] = useState(10);

  if (challenges.length === 0) {
    return <div className="text-muted-foreground">No completed challenges</div>;
  }

  const sortedChallenges = [...challenges].sort((a, b) => b.xpReward - a.xpReward);

  return (
    <div className="space-y-6">
      {sortedChallenges.slice(0, visibleChallenges).map((challenge) => {
        const playerChallenge = playerChallenges.find(
          (pc) => pc.challengeId === challenge.id
        );

        return (
          <div
            key={challenge.id}
            className="flex items-center justify-between p-6 bg-muted rounded-lg"
          >
            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">{challenge.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {challenge.description}
                </p>
              </div>
            </div>
            <div className="text-lg font-medium text-green-500">
              +{challenge.xpReward} XP
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

