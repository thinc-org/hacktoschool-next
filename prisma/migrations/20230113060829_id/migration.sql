/*
  Warnings:

  - Added the required column `courseid` to the `DiscussionBoard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `DiscussionBoard` ADD COLUMN `courseid` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `DiscussionBoard` ADD CONSTRAINT `DiscussionBoard_courseid_fkey` FOREIGN KEY (`courseid`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
