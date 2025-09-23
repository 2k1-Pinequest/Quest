"use client";

import { TeacherClassRoomHeader } from "@/components/teacher/Assign/teacherClassroomHeader";
import { TeacherClassRooms } from "@/components/teacher/Assign/teacherDashboard";

export default function Home() {
  

  return (
    <div >
       <TeacherClassRoomHeader />
      <TeacherClassRooms teacherId = {1}/>
    </div>
  );
}
