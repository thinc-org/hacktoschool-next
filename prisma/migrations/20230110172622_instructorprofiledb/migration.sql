-- CreateTable
CREATE TABLE `InstructorProfile` (
    `instructorid` INTEGER NOT NULL,
    `age` INTEGER NOT NULL,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `tel` VARCHAR(15) NOT NULL,
    `preferredsub` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`instructorid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `InstructorProfile` ADD CONSTRAINT `InstructorProfile_instructorid_fkey` FOREIGN KEY (`instructorid`) REFERENCES `Instructor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
