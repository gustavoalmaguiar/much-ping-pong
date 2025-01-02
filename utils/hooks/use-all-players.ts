import { useQuery } from "@tanstack/react-query";
import { getAllPlayers } from "@/utils/actions/get-all-players";

export function useAllPlayers() {
  return useQuery({
    queryKey: ["players"],
    queryFn: getAllPlayers,
  });
}
