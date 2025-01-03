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
import { revalidatePath } from "next/cache";

interface ChallengesClientProps {
  initialChallenges: Challenge[];
  initialPlayerChallenges: PlayerChallenge[];
  defaultTab: "active" | "completed" | "create";
  isAdmin: boolean;
}

export function ChallengesClient({
  initialChallenges,
  initialPlayerChallenges,
  defaultTab,
  isAdmin,
}: ChallengesClientProps) {
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [playerChallenges, setPlayerChallenges] = useState<PlayerChallenge[]>(initialPlayerChallenges);
  const [activeTab, setActiveTab] = useState<"active" | "completed" | "create">(
    !isAdmin && defaultTab === "create" ? "active" : defaultTab
  );
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const handleTabChange = (value: string) => {
    if (value === "create" && !isAdmin) return;
    setActiveTab(value as "active" | "completed" | "create");
    router.push(`${pathname}?tab=${value}`);
  };

  const addChallenge = async (newChallenge: Omit<Challenge, "id" | "createdAt">) => {
    try {
      const result = await createChallenge(newChallenge);

      if ('error' in result) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
        return;
      }

      toast({
        title: "Success",
        description: "Challenge created",
        variant: "default",
      });

      // Optionally switch to active tab after creation
      handleTabChange("active");
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
        (pc) => pc.challengeId === challenge.id && !pc.completed
      )
  );

  const completedChallenges = challenges.filter((challenge) =>
    playerChallenges.some(
      (pc) => pc.challengeId === challenge.id && pc.completed
    )
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Challenges</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger
                value="create"
                disabled={!isAdmin}
                className={!isAdmin ? "cursor-not-allowed opacity-50" : ""}
              >
                Create
              </TabsTrigger>
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
            {isAdmin && (
              <TabsContent value="create">
                <ChallengeForm onSubmit={addChallenge} />
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

