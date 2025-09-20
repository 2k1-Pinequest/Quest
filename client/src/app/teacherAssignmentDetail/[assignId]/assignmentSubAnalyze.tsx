"use client";

import { TeacherAssignDetailHeader } from "@/components/teacher/assignmentDetail/assignmentdetailHeader";
import { AssignmentTab } from "@/components/teacher/assignmentDetail/assignmentTab";
interface AssignmentDetailsProps {
  title: string;
  description: string;
}
export const AssignmentDetails = ({ title, description }: AssignmentDetailsProps) => {
  console.log("test", title)
  return (
    <div className="min-h-screen flex justify-center px-4">
      <div className="w-full max-w-[1200px]">
        <TeacherAssignDetailHeader />
        <AssignmentTab title={title} description={description} />
      </div>
    </div>
  );
};
