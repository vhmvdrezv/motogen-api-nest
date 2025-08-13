/*
  Warnings:

  - Added the required column `part` to the `PurchaseLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PurchaseLog" ADD COLUMN     "part" TEXT NOT NULL;
