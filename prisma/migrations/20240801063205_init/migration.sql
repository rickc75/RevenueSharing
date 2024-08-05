-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'BUSINESS_OWNER', 'SALESPERSON', 'BUSINESS_OWNER_AND_SALESPERSON');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "businessId" INTEGER,
    "sellerId" INTEGER,
    "totalAmountSpent" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "businesses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contactDetails" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "paymailId" TEXT NOT NULL,
    "totalAmountEarned" INTEGER NOT NULL,

    CONSTRAINT "businesses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "revenueSplit" DOUBLE PRECISION NOT NULL,
    "businessId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seller" (
    "id" SERIAL NOT NULL,
    "sellerUserId" INTEGER NOT NULL,
    "paymailId" TEXT NOT NULL,
    "totalAmountEarned" INTEGER NOT NULL,
    "totalSalesMade" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,

    CONSTRAINT "Seller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchases" (
    "id" SERIAL NOT NULL,
    "buyerId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sellerId" INTEGER NOT NULL,
    "ProductOwnerId" INTEGER NOT NULL,
    "ProductOwnerPaymailID" TEXT NOT NULL,
    "payedToBusinessTranscationId" TEXT NOT NULL,
    "payedToSalesPersonTranscationId" TEXT NOT NULL,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_businessId_key" ON "users"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "users_sellerId_key" ON "users"("sellerId");

-- CreateIndex
CREATE UNIQUE INDEX "businesses_ownerId_key" ON "businesses"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "businesses_paymailId_key" ON "businesses"("paymailId");

-- CreateIndex
CREATE UNIQUE INDEX "Seller_paymailId_key" ON "Seller"("paymailId");

-- AddForeignKey
ALTER TABLE "businesses" ADD CONSTRAINT "businesses_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seller" ADD CONSTRAINT "Seller_sellerUserId_fkey" FOREIGN KEY ("sellerUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
