-- CreateIndex
CREATE FULLTEXT INDEX `Course_title_description_idx` ON `Course`(`title`, `description`);
