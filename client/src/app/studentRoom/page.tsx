"use client";
import { StudentJoin } from "@/components/student/studentJoin";
import { StudentQuizView } from "@/components/student/studentQuiz";
import { useState } from "react";

export default function StudentRoomPage() {
  const [step, setStep] = useState(1);
  const [studentName, setStudentName] = useState("John Doe");
  const [avatar, setAvatar] = useState("👨‍🎓");

  const handleBack = () => setStep((prev) => prev - 1);
  const handleNext = (name: string, roomCode: string) => {
    setStudentName(name);
    setStep(2);
  };

  return (
    <div>
      {step === 1 && <StudentJoin onBack={handleBack} onNext={handleNext} />}
      {step === 2 && (
        <StudentQuizView
          studentName={studentName}
          avatar={avatar}
          onBack={handleBack}
        />
      )}
    </div>
  );
}
