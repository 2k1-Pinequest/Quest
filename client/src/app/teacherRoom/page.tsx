"use client";

import { TeacherClassRooms } from "@/components/teacher/teacherDashboard";



export default function Home() {
  
  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <TeacherClassRooms teacherId={1} />
    </div>
  );
}
