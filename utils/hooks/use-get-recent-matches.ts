import { useQuery } from "@tanstack/react-query";
import { getRecentMatches } from "@/utils/actions/get-recent-matches";

export function useGetRecentMatches() {
  return useQuery({
    queryKey: ["recentMatches"],
    queryFn: async () => {
      return await getRecentMatches();
    },
  });
}
