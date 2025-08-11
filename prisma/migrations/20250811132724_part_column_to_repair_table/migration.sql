/*
  Warnings:

  - Added the required column `part` to the `RepairLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RepairLog" ADD COLUMN     "part" TEXT NOT NULL;
