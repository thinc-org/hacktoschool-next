/*
  Warnings:

  - A unique constraint covering the columns `[studentId,courseId]` on the table `Enroll` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Enroll_studentId_courseId_key` ON `Enroll`(`studentId`, `courseId`);
