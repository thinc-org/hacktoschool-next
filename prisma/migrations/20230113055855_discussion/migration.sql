-- CreateTable
CREATE TABLE `DiscussionBoard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `detail` VARCHAR(191) NOT NULL,
    `like` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `detail` VARCHAR(191) NOT NULL,
    `like` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `did` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_did_fkey` FOREIGN KEY (`did`) REFERENCES `DiscussionBoard`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
