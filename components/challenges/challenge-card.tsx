import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Challenge } from "@/types/challenges";

interface ChallengeCardProps {
  currentValue: number;
  challenge: Challenge;
  percentage: number;
}

export function ChallengeCard({
  currentValue,
  challenge,
  percentage,
}: ChallengeCardProps) {
  const currentValueToUse =
    currentValue > challenge.requirementValue
      ? challenge.requirementValue
      : currentValue;
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold truncate">{challenge.title}</h3>
          <Badge variant="secondary" className="text-emerald-500">
            +{challenge.xpReward} XP
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            {challenge.description}
          </p>
          <div className="space-y-2">
            <Progress value={percentage} className="h-1.5 bg-neutral-400" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>
                {currentValueToUse} / {challenge.requirementValue}
              </span>
              <span>{percentage}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
