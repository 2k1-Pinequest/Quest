"use client";

import { TeacherAssignDetailHeader } from "@/components/teacher/assignmentDetail/assignmentdetailHeader";
import { AssignmentTab } from "@/components/teacher/assignmentDetail/assignmentTab";

export const AssignmentDetails = ({
  assignmentId,
}: {
  assignmentId: string;
}) => {
  return (
    <div className="min-h-screen p-6">
      <TeacherAssignDetailHeader />
      <AssignmentTab />
    </div>
  );
};
