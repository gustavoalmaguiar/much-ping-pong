import prisma from "@/lib/db";

export async function fetchPlayerProfile(playerId: string) {
  return prisma.user.findUnique({
    where: { id: playerId },
    include: {
      challenges: {
        include: {
          challenge: true,
        },
      },
      wonMatches: {
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          losers: true,
        },
      },
      lostMatches: {
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          winners: true,
        },
      },
    },
  });
}

export async function fetchMostRecentMatches(take: number) {
  return prisma.match.findMany({
    take: take,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      winners: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      losers: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
}

export async function fetchTopPlayers(take: number) {
  return prisma.user.findMany({
    take: take,
    orderBy: [{ xp: "desc" }, { wins: "desc" }],
    select: {
      id: true,
      name: true,
      image: true,
      xp: true,
      wins: true,
      _count: {
        select: {
          wonMatches: true,
        },
      },
    },
  });
}

export async function fetchAllMatches() {
  return prisma.match.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      type: true,
      winnerScore: true,
      loserScore: true,
      createdAt: true,
      winners: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      losers: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
}
