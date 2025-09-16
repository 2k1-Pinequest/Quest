/*
  Warnings:

  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentAnswer` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[studentId,assignmentId]` on the table `StudentAssignmentAi` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `assignmentId` to the `StudentAssignmentAi` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Question" DROP CONSTRAINT "Question_assignmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."StudentAnswer" DROP CONSTRAINT "StudentAnswer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."StudentAnswer" DROP CONSTRAINT "StudentAnswer_studentId_fkey";

-- DropIndex
DROP INDEX "public"."StudentAssignmentAi_studentId_key";

-- AlterTable
ALTER TABLE "public"."StudentAssignmentAi" ADD COLUMN     "assignmentId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."Question";

-- DropTable
DROP TABLE "public"."StudentAnswer";

-- CreateTable
CREATE TABLE "public"."StudentSubmission" (
    "id" SERIAL NOT NULL,
    "assignmentId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "answerText" TEXT,
    "fileUrl" TEXT,
    "score" DOUBLE PRECISION,
    "feedback" TEXT,
    "aiAnalysis" JSONB,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentAssignmentAi_studentId_assignmentId_key" ON "public"."StudentAssignmentAi"("studentId", "assignmentId");

-- AddForeignKey
ALTER TABLE "public"."StudentSubmission" ADD CONSTRAINT "StudentSubmission_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "public"."Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StudentSubmission" ADD CONSTRAINT "StudentSubmission_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StudentAssignmentAi" ADD CONSTRAINT "StudentAssignmentAi_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "public"."Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
