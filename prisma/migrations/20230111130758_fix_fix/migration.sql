-- DropIndex
DROP INDEX `Notification_courseId_fkey` ON `Notification`;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
