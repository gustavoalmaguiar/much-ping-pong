/*
  Warnings:

  - You are about to drop the column `role` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "role",
ADD COLUMN     "is_admin" BOOLEAN NOT NULL DEFAULT false;
