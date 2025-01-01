import AddMatchForm from "@/components/dashboard/add-match-form";
import RecentMatches from "@/components/dashboard/recent-matches";
import PlayerStats from "@/components/dashboard/player-stats";
import PlayerChallenges from "@/components/dashboard/player-challenges";
import TopPlayers from "@/components/dashboard/top-players";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6 px-4 lg:px-8 py-8">
      <AddMatchForm />

      {/* Second Row: Sidebar Components */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PlayerStats />
        <PlayerChallenges />
        <TopPlayers />
      </div>

      {/* Third Row: Recent Matches */}
      <RecentMatches />
    </div>
  );
}
