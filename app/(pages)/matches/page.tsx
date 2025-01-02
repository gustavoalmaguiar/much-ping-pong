import MatchesClient from "@/components/matches/matches-client";
import { getAllMatches } from "@/utils/actions/get-all-matches";

export default async function MatchesPage() {
  const matches = await getAllMatches();
  return <MatchesClient initialMatches={matches} />;
}