import { useQuery } from "@tanstack/react-query";
import { getTopPlayers } from "@/utils/actions/get-top-players";

export function useGetTopPlayers() {
  return useQuery({
    queryKey: ["topPlayers"],
    queryFn: getTopPlayers,
  });
}
