/*
  Warnings:

  - You are about to drop the column `insuranceExpirationDate` on the `Car` table. All the data in the column will be lost.
  - Added the required column `nextTechnicalInspectionDate` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "insuranceExpirationDate",
ADD COLUMN     "nextTechnicalInspectionDate" TIMESTAMP(3) NOT NULL;
