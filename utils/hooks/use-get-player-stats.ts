import { useQuery } from "@tanstack/react-query";
import { getPlayerStats } from "@/utils/actions/get-player-stats";

export function useGetPlayerStats() {
  return useQuery({
    queryKey: ["playerStats"],
    queryFn: async () => {
      return await getPlayerStats();
    },
  });
}
