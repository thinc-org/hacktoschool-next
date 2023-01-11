/*
  Warnings:

  - Added the required column `duedate` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publishtime` to the `Assignment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Assignment` ADD COLUMN `duedate` DATETIME(3) NOT NULL,
    ADD COLUMN `publishtime` DATETIME(3) NOT NULL;
