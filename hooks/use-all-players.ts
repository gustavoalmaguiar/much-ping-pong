import { useQuery } from "@tanstack/react-query";
import { getAllPlayers } from "@/utils/actions/getAllPlayers";

export function useAllPlayers() {
  return useQuery({
    queryKey: ["players"],
    queryFn: getAllPlayers,
  });
}
