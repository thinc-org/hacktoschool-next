/*
  Warnings:

  - Made the column `studentId` on table `Enroll` required. This step will fail if there are existing NULL values in that column.
  - Made the column `courseId` on table `Enroll` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Enroll` DROP FOREIGN KEY `Enroll_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Enroll` DROP FOREIGN KEY `Enroll_studentId_fkey`;

-- AlterTable
ALTER TABLE `Enroll` MODIFY `studentId` INTEGER NOT NULL,
    MODIFY `courseId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Enroll` ADD CONSTRAINT `Enroll_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enroll` ADD CONSTRAINT `Enroll_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
