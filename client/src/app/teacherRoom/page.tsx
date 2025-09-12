"use client";
import TeacherDashboard from "@/components/teacher/teacherDashboard";
import UploadFile from "./uploadFile";
import { Quiz } from "@/types/quiz";

export default function Home() {
  const handleBack = () => {};
  const handleStartQuiz = (quiz: Quiz) => {};
  return (
    <div>
      <TeacherDashboard onBack={handleBack} onStartQuiz={handleStartQuiz} />
      <UploadFile />
    </div>
  );
}
