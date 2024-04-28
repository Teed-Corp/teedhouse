/*
  Warnings:

  - You are about to drop the column `title` on the `task` table. All the data in the column will be lost.
  - You are about to drop the `custom_family_task` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `familyId` to the `task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "custom_family_task" DROP CONSTRAINT "custom_family_task_familyId_fkey";

-- AlterTable
ALTER TABLE "task" DROP COLUMN "title",
ADD COLUMN     "familyId" UUID NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "custom_family_task";

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
