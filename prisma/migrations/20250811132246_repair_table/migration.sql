-- CreateEnum
CREATE TYPE "RepairAction" AS ENUM ('REPAIR', 'REPLACE');

-- CreateTable
CREATE TABLE "RepairLog" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "repairAction" "RepairAction" NOT NULL,
    "kilometer" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "notes" TEXT,
    "carId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RepairLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RepairLog" ADD CONSTRAINT "RepairLog_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;
