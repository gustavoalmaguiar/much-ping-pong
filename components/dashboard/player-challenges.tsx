import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Trophy, Zap } from "lucide-react";

const mockChallenges = [
  {
    id: 1,
    title: "Win Streak",
    description: "Win 5 matches in a row",
    progress: 3,
    requirementValue: 5,
    xpReward: 100,
    icon: Trophy,
  },
  {
    id: 2,
    title: "Point Master",
    description: "Score 50 points in total",
    progress: 37,
    requirementValue: 50,
    xpReward: 150,
    icon: Zap,
  },
];

export default function PlayerChallenges() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-500" />
          <span className="text-lg">Active Challenges</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {mockChallenges.length === 0 ? (
          <p className="text-sm text-muted-foreground">No active challenges</p>
        ) : (
          <div className="space-y-4 p-2">
            {mockChallenges.map((challenge) => (
              <div key={challenge.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <challenge.icon className="h-4 w-4 text-black-500" />
                    <div>
                      <h3 className="font-semibold">{challenge.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {challenge.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-green-500">
                    +{challenge.xpReward} XP
                  </div>
                </div>
                <div className="space-y-1">
                  <Progress
                    value={
                      (challenge.progress / challenge.requirementValue) * 100
                    }
                    className="h-2"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {challenge.progress} / {challenge.requirementValue}
                    </span>
                    <span className="font-medium">
                      {Math.round(
                        (challenge.progress / challenge.requirementValue) * 100,
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
