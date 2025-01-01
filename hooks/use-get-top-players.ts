import { useQuery } from "@tanstack/react-query";
import { getTopPlayers } from "@/utils/actions/getTopPlayers";

export function useGetTopPlayers() {
  return useQuery({
    queryKey: ["topPlayers"],
    queryFn: async () => {
      return await getTopPlayers();
    },
  });
}
