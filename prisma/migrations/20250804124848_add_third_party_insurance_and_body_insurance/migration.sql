/*
  Warnings:

  - You are about to drop the column `nextTechnicalInspectionDate` on the `Car` table. All the data in the column will be lost.
  - Added the required column `thirdPartyInsuranceExpiry` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "nextTechnicalInspectionDate",
ADD COLUMN     "bodyInsuranceExpiry" TIMESTAMP(3),
ADD COLUMN     "thirdPartyInsuranceExpiry" TIMESTAMP(3) NOT NULL;
