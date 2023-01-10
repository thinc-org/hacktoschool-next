-- DropForeignKey
ALTER TABLE `Photo` DROP FOREIGN KEY `Photo_courseId_fkey`;

-- AddForeignKey
ALTER TABLE `Photo` ADD CONSTRAINT `Photo_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
