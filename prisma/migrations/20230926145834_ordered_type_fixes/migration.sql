/*
  Warnings:

  - You are about to drop the column `orderdBook` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "orderdBook",
ADD COLUMN     "orderdBooks" JSONB[] DEFAULT ARRAY[]::JSONB[];
