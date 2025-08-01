-- CreateEnum
CREATE TYPE "CarColor" AS ENUM ('BLACK', 'WHITE', 'SILVER', 'GRAY', 'RED', 'BLUE', 'GREEN', 'YELLOW', 'ORANGE', 'BROWN', 'PURPLE', 'GOLD');

-- CreateEnum
CREATE TYPE "Fuel" AS ENUM ('GASOLINE', 'GAS', 'DIESEL', 'GASOLINE_GAS');

-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "productYear" INTEGER NOT NULL,
    "color" "CarColor" NOT NULL,
    "kilometer" INTEGER NOT NULL,
    "fuel" "Fuel" NOT NULL,
    "insuranceExpirationDate" TIMESTAMP(3) NOT NULL,
    "nextTechnicalInspectionDate" TIMESTAMP(3) NOT NULL,
    "nickname" TEXT,
    "carTrimId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_carTrimId_fkey" FOREIGN KEY ("carTrimId") REFERENCES "CarTrim"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
