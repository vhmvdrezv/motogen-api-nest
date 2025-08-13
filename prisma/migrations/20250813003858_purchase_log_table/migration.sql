-- CreateEnum
CREATE TYPE "PurchaseCategory" AS ENUM ('BODY_AND_TRIM', 'CONSUMABLE', 'MECHANICAL');

-- CreateTable
CREATE TABLE "PurchaseLog" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "purchaseCategory" "PurchaseCategory" NOT NULL,
    "cost" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "notes" TEXT,
    "carId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PurchaseLog" ADD CONSTRAINT "PurchaseLog_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;
