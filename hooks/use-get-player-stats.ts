import { useQuery } from "@tanstack/react-query";
import { getPlayerStats } from "@/utils/actions/getPlayerStats";

export function useGetPlayerStats() {
  return useQuery({
    queryKey: ["playerStats"],
    queryFn: async () => {
      return await getPlayerStats();
    },
  });
}
