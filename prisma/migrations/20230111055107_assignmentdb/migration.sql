-- CreateTable
CREATE TABLE `Assignment` (
    `assignmentid` INTEGER NOT NULL AUTO_INCREMENT,
    `assignmentnumber` INTEGER NOT NULL,
    `instructorid` INTEGER NOT NULL,
    `courseid` INTEGER NOT NULL,
    `topic` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`assignmentid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentAssignment` (
    `assignmentid` INTEGER NOT NULL,
    `studentId` INTEGER NOT NULL,
    `score` INTEGER NOT NULL,
    `comment` VARCHAR(191) NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL,

    PRIMARY KEY (`studentId`, `assignmentid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_instructorid_fkey` FOREIGN KEY (`instructorid`) REFERENCES `Instructor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_courseid_fkey` FOREIGN KEY (`courseid`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentAssignment` ADD CONSTRAINT `StudentAssignment_assignmentid_fkey` FOREIGN KEY (`assignmentid`) REFERENCES `Assignment`(`assignmentid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentAssignment` ADD CONSTRAINT `StudentAssignment_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
