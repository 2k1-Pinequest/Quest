"use client";

import { TeacherAssignDetailHeader } from "@/components/teacher/assignmentDetail/assignmentdetailHeader";
import { AssignmentTab } from "@/components/teacher/assignmentDetail/assignmentTab";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
interface Assignment {
  roomName?: string;
  code?: string;
  id: number;
  title: string;
  description: string;
  dueDate: string;
  studentSubmissions?: {
    id: number;
    studentName: string;
    score: number | null;
    status: "PENDING" | "APPROVED" | "REJECTED";
  }[];
}
export const AssignmentDetails = () => {
  const params = useParams();
   const [assignmentData, setAssignmentData] = useState<{ assignment: Assignment } | null>(null);
  
   useEffect(() => {
    if (!params.assignId) return;

    axios
      .get(`http://localhost:4200/assignments/subs/${params.assignId}`)
      .then((res) => setAssignmentData(res.data))
      .catch((err) => console.error(err));
  }, [params.assignId]);

  return (
    <div className="min-h-screen flex justify-center px-4">
      <div className="w-full max-w-[1200px]">
        <TeacherAssignDetailHeader assignment={assignmentData?.assignment}/>
        <AssignmentTab />
      </div>
    </div>
  );
};
