"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Trophy } from 'lucide-react';
import { formatDistanceToNowStrict } from "date-fns";
import { Badge } from "@/components/ui/badge";

type Match = {
  id: string;
  type: string;
  winners: Array<{ id: string; name: string }>;
  losers: Array<{ id: string; name: string }>;
  score: string;
  createdAt: string;
};

export const columns: ColumnDef<Match>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const typeVariants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
        singles: "secondary",
        duo: "default",
      };

      const type = row.getValue("type") as string;
      const variant = typeVariants[type] || "outline";

      return (
        <Badge variant={variant} className="capitalize">
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "winners",
    header: "Winners",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Trophy className="h-4 w-4 text-yellow-500" />
        <span>
          {(row.getValue("winners") as Array<{ name: string }>)
            .map((w) => w.name)
            .join(" & ")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "losers",
    header: "Losers",
    cell: ({ row }) => (
      <span>
        {(row.getValue("losers") as Array<{ name: string }>)
          .map((l) => l.name)
          .join(" & ")}
      </span>
    ),
  },
  {
    accessorKey: "score",
    header: "Score",
    cell: ({ row }) => <span className="font-mono">{row.getValue("score")}</span>,
  },
  {
    accessorKey: "createdAt",
    header: "Time",
    cell: ({ row }) => {
      return (
        <span title={new Date(row.getValue("createdAt")).toLocaleString()}>
          {formatDistanceToNowStrict(new Date(row.getValue("createdAt")), {
            addSuffix: true,
          })}
        </span>
      );
    },
  },
];

