/*
  Warnings:

  - You are about to drop the column `socketId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `isCorrect` on the `StudentAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `optionId` on the `StudentAnswer` table. All the data in the column will be lost.
  - You are about to drop the `Option` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `answerText` to the `StudentAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Option" DROP CONSTRAINT "Option_questionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Student" DROP CONSTRAINT "Student_roomId_fkey";

-- DropForeignKey
ALTER TABLE "public"."StudentAnswer" DROP CONSTRAINT "StudentAnswer_optionId_fkey";

-- AlterTable
ALTER TABLE "public"."Assignment" ADD COLUMN     "fileUrl" TEXT;

-- AlterTable
ALTER TABLE "public"."Student" DROP COLUMN "socketId",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "roomId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."StudentAnswer" DROP COLUMN "isCorrect",
DROP COLUMN "optionId",
ADD COLUMN     "aiAnalysis" JSONB,
ADD COLUMN     "answerText" TEXT NOT NULL,
ADD COLUMN     "feedback" TEXT,
ADD COLUMN     "score" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "public"."Teacher" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Option";

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "public"."Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "public"."Teacher"("email");

-- AddForeignKey
ALTER TABLE "public"."Student" ADD CONSTRAINT "Student_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
