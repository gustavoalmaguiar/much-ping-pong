import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export function MatchFormSkeleton() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Quick Match Entry</h2>
      <div className="space-y-4">
        {/* Match Type Tabs Skeleton */}
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Winners Section Skeleton */}
          <div className="space-y-3">
            <h3 className="font-medium">Winners</h3>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" /> {/* Label */}
              <Skeleton className="h-10 w-full" /> {/* Player Select */}
            </div>
          </div>

          {/* Losers Section Skeleton */}
          <div className="space-y-3">
            <h3 className="font-medium">Losers</h3>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" /> {/* Label */}
              <Skeleton className="h-10 w-full" /> {/* Player Select */}
            </div>
          </div>
        </div>

        {/* Score Section Skeleton */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" /> {/* Label */}
            <Skeleton className="h-9 w-full" /> {/* Score Input */}
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" /> {/* Label */}
            <Skeleton className="h-9 w-full" /> {/* Score Input */}
          </div>
        </div>

        {/* Submit Button Skeleton */}
        <Button className="w-full">Record Match</Button>
      </div>
    </Card>
  );
}
