import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface CompactChallengeCardProps {
  challenge:
    | {
        id: string;
        title: string;
        description: string;
        progress: number;
        requirementValue: number;
        xpReward: number;
      }
    | undefined;
}

export function CompactChallengeCard({ challenge }: CompactChallengeCardProps) {
  if (!challenge) {
    return (
      <div className="text-xs text-neutral-400">Challenge data unavailable</div>
    );
  }

  const progress = (challenge.progress / challenge.requirementValue) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium truncate" title={challenge.title}>
          {challenge.title}
        </span>
        <Badge variant="secondary" className="text-emerald-500">
          <span className="text-xs font-semibold">
            +{challenge.xpReward} XP
          </span>
        </Badge>
      </div>
      <div className="space-y-2">
        <Progress value={progress} className="h-1.5 bg-neutral-400" />
        <div className="flex justify-between text-xs text-neutral-400">
          <span>
            {challenge.progress}/{challenge.requirementValue}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
}
