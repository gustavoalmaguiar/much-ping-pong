"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActiveChallenges } from "@/components/challenges/active-challenges";
import { CompletedChallenges } from "@/components/challenges/completed-challenges";
import { ChallengeForm } from "@/components/admin/challenge-form";
import { Challenge, PlayerChallenge } from "@/types/challenges";
import { createChallenge } from "@/utils/actions/create-challenge";
import { useToast } from "@/utils/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ChallengesClientProps {
  initialChallenges: Challenge[];
  initialPlayerChallenges: PlayerChallenge[];
  defaultTab: "active" | "completed";
  isAdmin: boolean;
}

export function ChallengesClient({
  initialChallenges,
  initialPlayerChallenges,
  defaultTab,
  isAdmin,
}: ChallengesClientProps) {
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [playerChallenges, setPlayerChallenges] = useState<PlayerChallenge[]>(
    initialPlayerChallenges,
  );
  const [activeTab, setActiveTab] = useState<"active" | "completed">(
    defaultTab,
  );
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const handleTabChange = (value: string) => {
    setActiveTab(value as "active" | "completed");
    router.push(`${pathname}?tab=${value}`);
  };

  const addChallenge = async (
    newChallenge: Omit<Challenge, "id" | "createdAt">,
  ) => {
    try {
      const result = await createChallenge(newChallenge);

      if ("error" in result) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Challenge created",
        variant: "default",
      });

      setShowForm(false);
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create challenge",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const activeChallenges = challenges.filter(
    (challenge) =>
      challenge.isActive &&
      playerChallenges.some(
        (pc) => pc.challengeId === challenge.id && !pc.completed,
      ),
  );

  const completedChallenges = challenges.filter((challenge) =>
    playerChallenges.some(
      (pc) => pc.challengeId === challenge.id && pc.completed,
    ),
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Challenges</CardTitle>
          {isAdmin && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowForm(!showForm)}
              className="h-8 w-8 rounded-full"
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {showForm && isAdmin ? (
            <div className="mb-8">
              <ChallengeForm onSubmit={addChallenge} />
            </div>
          ) : (
            <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <TabsContent value="active">
                <ActiveChallenges
                  challenges={activeChallenges}
                  playerChallenges={playerChallenges}
                />
              </TabsContent>
              <TabsContent value="completed">
                <CompletedChallenges
                  challenges={completedChallenges}
                  playerChallenges={playerChallenges}
                />
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
