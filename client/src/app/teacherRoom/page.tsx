"use client";
import { TeacherClassRooms } from "@/components/teacher/teacherDashboard";


export default function Home() {
  // const handleBack = () => {};
  // const handleStartQuiz = (quiz: Quiz) => {};
  return (
    <div>
      <TeacherClassRooms />
      {/* <TeacherDashboard onBack={handleBack} onStartQuiz={handleStartQuiz} /> */}
      {/* <UploadFile /> */}
    </div>
  );
}
