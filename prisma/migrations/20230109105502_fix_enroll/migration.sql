-- DropForeignKey
ALTER TABLE `Enroll` DROP FOREIGN KEY `Enroll_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Enroll` DROP FOREIGN KEY `Enroll_studentId_fkey`;

-- AlterTable
ALTER TABLE `Enroll` MODIFY `studentId` INTEGER NULL,
    MODIFY `courseId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Enroll` ADD CONSTRAINT `Enroll_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enroll` ADD CONSTRAINT `Enroll_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
