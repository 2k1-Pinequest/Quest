"use client";

import { TeacherAssignDetailHeader } from "@/components/teacher/assignmentDetail/assignmentdetailHeader";
import { AssignmentTab } from "@/components/teacher/assignmentDetail/assignmentTab";

export const AssignmentDetails = () => {
  return (
    <div className="min-h-screen flex justify-center px-4">
      <div className="w-full max-w-[1200px]">
        <TeacherAssignDetailHeader />
        <AssignmentTab />
      </div>
    </div>
  );
};
