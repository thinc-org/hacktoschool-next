/*
  Warnings:

  - Added the required column `topic` to the `DiscussionBoard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `DiscussionBoard` ADD COLUMN `topic` VARCHAR(191) NOT NULL;
