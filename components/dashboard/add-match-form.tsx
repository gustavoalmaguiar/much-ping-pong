"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { MatchFormSkeleton } from "./match-form-skeleton";
import { MatchPlayerSelect } from "./match-player-select";
import { MatchScoreInput } from "./match-score-input";
import type { Player } from "@prisma/client";
import { createMatch } from "@/utils/actions/createMatch";
import { useAllPlayers } from "@/hooks/use-all-players";
import { auth } from "@/auth";
import prisma from "@/lib/db";
import { useSession } from "next-auth/react";

export default function AddMatchForm() {
  const [matchType, setMatchType] = useState<"singles" | "duo">("singles");
  const [winner1, setWinner1] = useState("");
  const [winner2, setWinner2] = useState("");
  const [loser1, setLoser1] = useState("");
  const [loser2, setLoser2] = useState("");
  const [winnerScore, setWinnerScore] = useState("");
  const [loserScore, setLoserScore] = useState("");

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: players, isLoading } = useAllPlayers();
  const { data: session } = useSession();

  // Memoized available player lists for each selection
  const availablePlayers = useMemo(() => {
    if (!players) return { winner1: [], winner2: [], loser1: [], loser2: [] };

    const selectedPlayers = new Set(
      [winner1, winner2, loser1, loser2].filter(Boolean),
    );

    return {
      winner1: players.filter(
        (p) => !selectedPlayers.has(p.id) || p.id === winner1,
      ) as Player[],
      winner2: players.filter(
        (p) => !selectedPlayers.has(p.id) || p.id === winner2,
      ) as Player[],
      loser1: players.filter(
        (p) => !selectedPlayers.has(p.id) || p.id === loser1,
      ) as Player[],
      loser2: players.filter(
        (p) => !selectedPlayers.has(p.id) || p.id === loser2,
      ) as Player[],
    };
  }, [players, winner1, winner2, loser1, loser2]);

  // Score validation
  const validateScore = (score: string): boolean => {
    const num = parseInt(score);
    return !isNaN(num) && num >= 0 && num <= 11;
  };

  const handleScoreChange = (
    value: string,
    setter: (value: string) => void,
  ) => {
    if (value === "" || validateScore(value)) {
      setter(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      toast({
        title: "Error",
        description: "You must be logged in to record a match",
        variant: "destructive",
      });
      return;
    }
    if (!session.user?.id) {
      toast({
        title: "Error",
        description: "User ID not found",
        variant: "destructive",
      });
      return;
    }
    // Only allow users to log matches where they are one of the players.
    const player = session.user.id;
    if (
      !(
        player === winner1 ||
        player === winner2 ||
        player === loser1 ||
        player === loser2
      )
    ) {
      toast({
        title: "Error",
        description: "You must be one of the match players",
        variant: "destructive",
      });
      return;
    }

    // Validation checks
    if (
      !winner1 ||
      !loser1 ||
      !winnerScore ||
      !loserScore ||
      (matchType === "duo" && (!winner2 || !loser2))
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const wScore = parseInt(winnerScore);
    const lScore = parseInt(loserScore);

    // Score validation
    if (!validateScore(winnerScore) || !validateScore(loserScore)) {
      toast({
        title: "Error",
        description: "Scores must be between 0 and 11",
        variant: "destructive",
      });
      return;
    }

    // Winner must have higher score
    if (wScore <= lScore) {
      toast({
        title: "Error",
        description: "Winner's score must be higher than loser's score",
        variant: "destructive",
      });
      return;
    }

    try {
      const winnerIds =
        matchType === "singles" ? [winner1] : [winner1, winner2];
      const loserIds = matchType === "singles" ? [loser1] : [loser1, loser2];

      await createMatch({
        type: matchType,
        winnerIds,
        loserIds,
        winnerScore: wScore,
        loserScore: lScore,
      });

      // Reset form
      setWinner1("");
      setWinner2("");
      setLoser1("");
      setLoser2("");
      setWinnerScore("");
      setLoserScore("");

      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["playerstats"] });
      queryClient.invalidateQueries({ queryKey: ["recentmatches"] });
      queryClient.invalidateQueries({ queryKey: ["topplayers"] });
      queryClient.invalidateQueries({ queryKey: ["players"] });

      toast({
        title: "Match recorded!",
        description: "The match has been successfully saved.",
      });
    } catch (error) {
      console.error("Failed to create match:", error);
      toast({
        title: "Error",
        description: "Failed to record the match. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <MatchFormSkeleton />;
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Quick Match Entry</h2>

      <Tabs
        value={matchType}
        onValueChange={(v: string) => setMatchType(v as "singles" | "duo")}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="singles">Singles</TabsTrigger>
          <TabsTrigger value="duo">Duo</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Winners Section */}
            <div className="space-y-3">
              <h3 className="font-medium">Winners</h3>
              <MatchPlayerSelect
                label="Player 1"
                value={winner1}
                onValueChange={setWinner1}
                availablePlayers={availablePlayers.winner1}
              />
              {matchType === "duo" && (
                <MatchPlayerSelect
                  label="Player 2"
                  value={winner2}
                  onValueChange={setWinner2}
                  availablePlayers={availablePlayers.winner2}
                />
              )}
            </div>

            {/* Losers Section */}
            <div className="space-y-3">
              <h3 className="font-medium">Losers</h3>
              <MatchPlayerSelect
                label="Player 1"
                value={loser1}
                onValueChange={setLoser1}
                availablePlayers={availablePlayers.loser1}
              />
              {matchType === "duo" && (
                <MatchPlayerSelect
                  label="Player 2"
                  value={loser2}
                  onValueChange={setLoser2}
                  availablePlayers={availablePlayers.loser2}
                />
              )}
            </div>
          </div>

          {/* Score Section */}
          <div className="grid grid-cols-2 gap-4">
            <MatchScoreInput
              label="Winner Score"
              value={winnerScore}
              onChange={(value) => handleScoreChange(value, setWinnerScore)}
            />
            <MatchScoreInput
              label="Loser Score"
              value={loserScore}
              onChange={(value) => handleScoreChange(value, setLoserScore)}
            />
          </div>

          <Button type="submit" className="w-full">
            Record Match
          </Button>
        </form>
      </Tabs>
    </Card>
  );
}
