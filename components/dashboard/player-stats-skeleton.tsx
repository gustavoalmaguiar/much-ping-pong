import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Trophy, Zap } from "lucide-react";

export default function PlayerStatsSkeleton() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="grid gap-1">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">XP Progress</span>
              <Skeleton className="h-4 w-12" />
            </div>
            <Progress value={0} className="h-2" />
            <div className="flex justify-between text-xs">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <Trophy className="mx-auto h-5 w-5 text-yellow-500" />
              <Skeleton className="h-5 w-5 mx-auto" />
              <div className="text-xs text-muted-foreground">Wins</div>
            </div>
            <div className="space-y-1">
              <Target className="mx-auto h-5 w-5 text-red-500" />
              <Skeleton className="h-5 w-5 mx-auto" />
              <div className="text-xs text-muted-foreground">Losses</div>
            </div>
            <div className="space-y-1">
              <Zap className="mx-auto h-5 w-5 text-blue-500" />
              <Skeleton className="h-5 w-5 mx-auto" />
              <div className="text-xs text-muted-foreground">Streak</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
