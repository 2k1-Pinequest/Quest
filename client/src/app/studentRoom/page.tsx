"use client";
import { StudentJoin } from "@/components/student/studentJoin";
import { useState } from "react";

export default function StudentRoomPage() {
  const [step, setStep] = useState(1);

  const handleBack = () => {
    console.log("Back clicked");
    setStep(step - 1);
  };

  const handleNext = (name: string, roomCode: string) => {
    console.log("Next clicked", name, roomCode);
    setStep(step + 1);
  };

  return (
    <div>
      <StudentJoin onBack={handleBack} onNext={handleNext} />
    </div>
  );
}
