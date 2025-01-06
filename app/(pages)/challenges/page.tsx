import { auth } from "@/auth";
import prisma from "@/lib/db";
import { ChallengesClient } from "@/components/challenges/challenges-client";
import { Challenge, PlayerChallenge } from "@/types/challenges";
import { getChallenges } from "@/utils/actions/get-challenges";
import { getAllPlayerChallenges } from "@/utils/actions/get-all-player-challenges";

type tParams = Promise<{
  tab?: string;
}>;

export default async function ChallengesPage({
  searchParams
}: {
  searchParams: tParams;
}) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  // Fetch player to check admin status
  const player = await prisma.user.findUnique({
    where: { id: userId },
    select: { isAdmin: true },
  });

  const { tab } = await searchParams;

  const challenges = await getChallenges();
  const playerChallenges = await getAllPlayerChallenges();

  return (
    <ChallengesClient
      initialChallenges={challenges as Challenge[]}
      initialPlayerChallenges={playerChallenges as PlayerChallenge[]}
      defaultTab={(tab as "active" | "completed") || "active"}
      isAdmin={player?.isAdmin ?? false}
    />
  );
}
