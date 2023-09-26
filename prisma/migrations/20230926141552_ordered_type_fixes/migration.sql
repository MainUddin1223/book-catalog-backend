-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "orderdBook" SET DEFAULT ARRAY[]::JSONB[];
