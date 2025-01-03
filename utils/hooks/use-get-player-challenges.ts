import { useQuery } from "@tanstack/react-query";
import { getPlayerChallenges } from "@/utils/actions/get-player-challenges";

export function useGetPlayerChallenges() {
  return useQuery({
    queryKey: ["playerChallenges"],
    queryFn: getPlayerChallenges,
  });
}
