import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { History } from "lucide-react";

function MatchItemSkeleton() {
  return (
    <div className="flex items-center p-2 rounded-lg">
      <div className="w-[68px]">
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex items-start gap-2">
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="mt-1">
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="w-[80px] text-right">
        <Skeleton className="h-4 w-8 ml-auto" />
        <Skeleton className="h-3 w-16 ml-auto mt-1" />
      </div>
    </div>
  );
}

export default function RecentMatchesSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <History className="h-5 w-5" />
          Recent Matches
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <MatchItemSkeleton key={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
