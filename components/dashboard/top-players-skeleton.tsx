import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy } from "lucide-react";

function PlayerItemSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="flex-1 min-w-0">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-24 mt-1" />
      </div>
      <Skeleton className="h-5 w-8" />
    </div>
  );
}

export default function TopPlayersSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="text-lg">Top Players</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <PlayerItemSkeleton key={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
