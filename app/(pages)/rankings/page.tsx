import RankingsClient from "@/components/rankings/rankings-client";
import { getAllPlayerRankings } from "@/utils/actions/get-all-player-rankings";

export default async function MatchesPage() {
  const players = await getAllPlayerRankings();
  return <RankingsClient initialPlayers={players} />;
}
