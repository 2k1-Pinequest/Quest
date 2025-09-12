-- DropForeignKey
ALTER TABLE "public"."Room" DROP CONSTRAINT "Room_teacherId_fkey";

-- AlterTable
ALTER TABLE "public"."Room" ALTER COLUMN "teacherId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Room" ADD CONSTRAINT "Room_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "public"."Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
