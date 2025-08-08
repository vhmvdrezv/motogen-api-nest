-- CreateEnum
CREATE TYPE "OilType" AS ENUM ('ENGINE', 'GEARBOX', 'BRAKE', 'STEERING');

-- CreateTable
CREATE TABLE "OilChangeLog" (
    "id" TEXT NOT NULL,
    "oilType" "OilType" NOT NULL,
    "oilBrandAndModel" TEXT NOT NULL,
    "kilometer" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "notes" TEXT,
    "oilFilterChanged" BOOLEAN,
    "airFilterChanged" BOOLEAN,
    "cabinFilterChanged" BOOLEAN,
    "fuelFilterChanged" BOOLEAN,
    "carId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OilChangeLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OilChangeLog" ADD CONSTRAINT "OilChangeLog_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;
