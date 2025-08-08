/*
  Warnings:

  - Added the required column `date` to the `OilChangeLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OilChangeLog" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
