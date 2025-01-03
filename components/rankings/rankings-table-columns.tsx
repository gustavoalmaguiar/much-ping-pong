"use client";

import { PlayerDTO } from "@/types/player";
import { ColumnDef } from "@tanstack/react-table";
import { Trophy, Medal, Award } from "lucide-react";

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-500" />;
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />;
    case 3:
      return <Award className="h-5 w-5 text-amber-600" />;
    default:
      return null;
  }
};

export const columns: ColumnDef<PlayerDTO>[] = [
  {
    accessorKey: "rank",
    header: "Rank",
    cell: ({ row }) => {
      const rank = row.original.rank;
      return (
        <div className="flex items-center">
          {getRankIcon(rank)}
          <span className="ml-2">{rank}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Player",
  },
  {
    accessorKey: "level",
    header: "Level",
    cell: ({ row }) => (
      <div className="font-semibold">{row.getValue("level")}</div>
    ),
  },
  {
    accessorKey: "xp",
    header: "XP",
    cell: ({ row }) => <div>{row.getValue("xp")} XP</div>,
  },
  {
    accessorKey: "winRate",
    header: "Win Rate",
    cell: ({ row }) => <div>{row.getValue("winRate")}%</div>,
  },
  {
    accessorKey: "wl",
    header: "W/L",
    cell: ({ row }) => {
      const player = row.original;
      return (
        <div>
          {player.wins}/{player.losses}
        </div>
      );
    },
  },
];
