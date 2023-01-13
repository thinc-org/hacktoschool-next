/*
  Warnings:

  - Added the required column `des` to the `CourseMaterial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `CourseMaterial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CourseMaterial` ADD COLUMN `des` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
