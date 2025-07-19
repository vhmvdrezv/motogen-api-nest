-- CreateTable
CREATE TABLE "CarBrand" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CarBrand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarModel" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "carBrandId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CarModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarTrim" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Standard',
    "firstYearProd" INTEGER NOT NULL,
    "lastYearProd" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "carModelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CarTrim_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CarBrand_title_key" ON "CarBrand"("title");

-- CreateIndex
CREATE INDEX "CarBrand_active_idx" ON "CarBrand"("active");

-- CreateIndex
CREATE INDEX "CarModel_carBrandId_active_idx" ON "CarModel"("carBrandId", "active");

-- CreateIndex
CREATE UNIQUE INDEX "CarModel_carBrandId_title_key" ON "CarModel"("carBrandId", "title");

-- CreateIndex
CREATE INDEX "CarTrim_carModelId_active_idx" ON "CarTrim"("carModelId", "active");

-- CreateIndex
CREATE UNIQUE INDEX "CarTrim_carModelId_title_key" ON "CarTrim"("carModelId", "title");

-- AddForeignKey
ALTER TABLE "CarModel" ADD CONSTRAINT "CarModel_carBrandId_fkey" FOREIGN KEY ("carBrandId") REFERENCES "CarBrand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarTrim" ADD CONSTRAINT "CarTrim_carModelId_fkey" FOREIGN KEY ("carModelId") REFERENCES "CarModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
