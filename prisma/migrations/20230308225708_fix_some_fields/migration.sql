/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `isActive` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "isActive",
ALTER COLUMN "id" DROP NOT NULL,
ALTER COLUMN "userProfile" DROP NOT NULL,
ALTER COLUMN "userXP" SET DEFAULT 0;
