-- DropForeignKey
ALTER TABLE `Enroll` DROP FOREIGN KEY `Enroll_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Enroll` DROP FOREIGN KEY `Enroll_studentId_fkey`;

-- AddForeignKey
ALTER TABLE `Enroll` ADD CONSTRAINT `Enroll_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enroll` ADD CONSTRAINT `Enroll_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
