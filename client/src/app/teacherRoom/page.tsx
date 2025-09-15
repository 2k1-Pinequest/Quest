"use client";

import { useState } from "react";
import TeacherSignup from "@/components/auth/teacher/sign-up";
import TeacherLogin from "@/components/auth/teacher/sign-in";
import TeacherCreateRoom from "@/components/teacher/createRoom/newRoom";
import { TeacherClassRooms } from "@/components/teacher/teacherDashboard";



export default function Home() {
  const [step, setStep] = useState<"login" | "signup" | "createRoom" | "dashboard">("login");
  const [teacherId, setTeacherId] = useState<number | null>(null);
  
  const handleSignupSuccess = () => setStep("login");

  const handleLoginSuccess = (id: number, hasRoom: boolean) => {
    setTeacherId(id);
    if (hasRoom) {
      setStep("dashboard");
    } else{
      setStep("createRoom");
    }
  };

  const handleRoomCreated = () => setStep("dashboard");

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      {step === "signup" && <TeacherSignup onSuccess={handleSignupSuccess} />}
      {step === "login" && <TeacherLogin onSuccess={handleLoginSuccess} />}
      {step === "createRoom" && teacherId && (
        <TeacherCreateRoom teacherId={teacherId} onCreated={handleRoomCreated} />
      )}
      {step === "dashboard" && <TeacherClassRooms />}
    </div>
  );
}
