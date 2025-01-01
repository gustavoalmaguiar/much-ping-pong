import { useQuery } from "@tanstack/react-query";
import { getPlayerStats } from "@/utils/actions/getPlayerStats";

export function useGetPlayerStats() {
  return useQuery({
    queryKey: ["playerstats"],
    queryFn: async () => {
      return await getPlayerStats();
    },
  });
}
