import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search input skeleton */}
          <Skeleton className="h-10 w-full mb-4" />

          {/* Table skeleton */}
          <div className="rounded-md border">
            {/* Header */}
            <div className="grid grid-cols-7 p-4 bg-muted/50">
              {[
                "Rank",
                "Player",
                "Level",
                "XP",
                "Win Rate",
                "Wins",
                "Losses",
              ].map((_, i) => (
                <Skeleton key={i} className="h-4 w-[80%]" />
              ))}
            </div>

            {/* Rows */}
            <div className="divide-y">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="grid grid-cols-7 p-4">
                  {/* Rank */}
                  <Skeleton className="h-4 w-8" />
                  {/* Player name */}
                  <Skeleton className="h-4 w-32" />
                  {/* Level */}
                  <Skeleton className="h-4 w-16" />
                  {/* XP */}
                  <Skeleton className="h-4 w-20" />
                  {/* Win Rate */}
                  <Skeleton className="h-4 w-16" />
                  {/* Wins */}
                  <Skeleton className="h-4 w-12" />
                  {/* Losses */}
                  <Skeleton className="h-4 w-12" />
                </div>
              ))}
            </div>
          </div>

          {/* Pagination skeleton */}
          <div className="flex items-center justify-between pt-4">
            <Skeleton className="h-8 w-[100px]" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
