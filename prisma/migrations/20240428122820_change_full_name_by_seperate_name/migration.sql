/*
  Warnings:

  - You are about to drop the column `full_name` on the `profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profile" DROP COLUMN "full_name",
ADD COLUMN     "firstname" TEXT,
ADD COLUMN     "lastname" TEXT;
