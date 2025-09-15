-- CreateTable
CREATE TABLE "public"."StudentAssignmentAi" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "summary" TEXT NOT NULL,
    "mistakes" TEXT[],
    "suggestions" TEXT[],
    "overall" TEXT NOT NULL,

    CONSTRAINT "StudentAssignmentAi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentAssignmentAi_studentId_key" ON "public"."StudentAssignmentAi"("studentId");

-- AddForeignKey
ALTER TABLE "public"."StudentAssignmentAi" ADD CONSTRAINT "StudentAssignmentAi_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
