/*
  Warnings:

  - You are about to drop the column `nickname` on the `Car` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "nickname",
ADD COLUMN     "nickName" TEXT;
