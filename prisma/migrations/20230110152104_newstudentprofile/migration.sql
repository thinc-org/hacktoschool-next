-- CreateTable
CREATE TABLE `StudentProfile` (
    `studentid` INTEGER NOT NULL,
    `age` INTEGER NOT NULL,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `tel` INTEGER NOT NULL,
    `preferredsub` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`studentid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StudentProfile` ADD CONSTRAINT `StudentProfile_studentid_fkey` FOREIGN KEY (`studentid`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
