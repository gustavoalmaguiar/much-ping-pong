import { useQuery } from "@tanstack/react-query";
import { getRecentMatches } from "@/utils/actions/getRecentMatches";

export function useGetRecentMatches() {
  return useQuery({
    queryKey: ["recentmatches"],
    queryFn: async () => {
      return await getRecentMatches();
    },
  });
}
