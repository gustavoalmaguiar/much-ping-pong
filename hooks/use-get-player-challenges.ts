import { useQuery } from "@tanstack/react-query";
import { getPlayerChallenges } from "@/utils/actions/getPlayerChallenges";

export function useGetPlayerChallenges() {
  return useQuery({
    queryKey: ["playerChallenges"],
    queryFn: async () => {
      return await getPlayerChallenges();
    },
  });
}