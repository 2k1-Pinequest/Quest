"use client";

import { TeacherClassRooms } from "@/components/teacher/Assign/teacherDashboard";

export default function Home() {
  
  return (
    <div >
      <TeacherClassRooms teacherId = {1} />
    </div>
  );
}
