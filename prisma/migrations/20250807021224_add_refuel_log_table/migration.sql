-- CreateEnum
CREATE TYPE "RefuelPaymentMethod" AS ENUM ('SUBSIDIZED', 'MARKET');

-- CreateTable
CREATE TABLE "RefuelLog" (
    "id" TEXT NOT NULL,
    "liters" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "paymentMethod" "RefuelPaymentMethod" NOT NULL,
    "notes" TEXT,
    "carId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RefuelLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RefuelLog" ADD CONSTRAINT "RefuelLog_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;
