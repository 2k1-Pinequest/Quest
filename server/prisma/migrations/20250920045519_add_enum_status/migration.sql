/*
  Warnings:

  - You are about to drop the column `fileUrl` on the `Assignment` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."SubmissionStatus" AS ENUM ('PENDING', 'ANALYZING', 'ANALYZED', 'APPROVED');

-- AlterTable
ALTER TABLE "public"."Assignment" DROP COLUMN "fileUrl",
ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "textContent" TEXT;

-- AlterTable
ALTER TABLE "public"."StudentAssignmentAi" ALTER COLUMN "summary" DROP NOT NULL,
ALTER COLUMN "overall" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."StudentSubmission" ADD COLUMN     "status" "public"."SubmissionStatus" NOT NULL DEFAULT 'PENDING';
