-- DropForeignKey
ALTER TABLE `Course` DROP FOREIGN KEY `Course_instructorId_fkey`;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `Instructor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
