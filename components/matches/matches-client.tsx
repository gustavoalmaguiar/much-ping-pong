"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/matches/matches-table-columns";

type Match = {
  id: string;
  type: string;
  winners: Array<{ id: string; name: string }>;
  losers: Array<{ id: string; name: string }>;
  score: string;
  createdAt: Date;
};

interface MatchesClientProps {
  initialMatches: Match[];
}

export default function MatchesClient({ initialMatches }: MatchesClientProps) {
  const [matches, setMatches] = useState(initialMatches);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMatches = matches.filter((match) =>
    match.winners.concat(match.losers).some((player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Match History</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          <DataTable columns={columns} data={filteredMatches} />
        </CardContent>
      </Card>
    </div>
  );
}

