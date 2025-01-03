/*
  Warnings:

  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Losers" DROP CONSTRAINT "_Losers_B_fkey";

-- DropForeignKey
ALTER TABLE "_Winners" DROP CONSTRAINT "_Winners_B_fkey";

-- DropForeignKey
ALTER TABLE "player_challenges" DROP CONSTRAINT "player_challenges_player_id_fkey";

-- DropTable
DROP TABLE "Player";

-- CreateTable
CREATE TABLE "players" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "image_url" TEXT,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "losses" INTEGER NOT NULL DEFAULT 0,
    "current_streak" INTEGER NOT NULL DEFAULT 0,
    "longest_streak" INTEGER NOT NULL DEFAULT 0,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "players_email_key" ON "players"("email");

-- AddForeignKey
ALTER TABLE "player_challenges" ADD CONSTRAINT "player_challenges_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Winners" ADD CONSTRAINT "_Winners_B_fkey" FOREIGN KEY ("B") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Losers" ADD CONSTRAINT "_Losers_B_fkey" FOREIGN KEY ("B") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;