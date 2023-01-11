/*
  Warnings:

  - You are about to drop the column `instructorid` on the `Assignment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Assignment` DROP FOREIGN KEY `Assignment_instructorid_fkey`;

-- AlterTable
ALTER TABLE `Assignment` DROP COLUMN `instructorid`;
