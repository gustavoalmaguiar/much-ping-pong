"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/rankings/rankings-table-columns";

type Player = {
  id: string;
  name: string;
  rank: number;
  level: number;
  xp: number;
  winRate: number;
  wins: number;
  losses: number;
};

interface RankingsClientProps {
  initialPlayers: Player[];
}

export default function RankingsClient({ initialPlayers }: RankingsClientProps) {
  const [players, setPlayers] = useState(initialPlayers);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          <DataTable columns={columns} data={filteredPlayers} />
        </CardContent>
      </Card>
    </div>
  );
}

