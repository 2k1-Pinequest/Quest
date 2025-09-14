"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TeacherSignup from "@/components/auth/sign-up";
import TeacherLogin from "@/components/auth/sign-in";
import TeacherCreateRoom from "@/components/teacher/createRoom/newRoom";
import { TeacherClassRooms } from "@/components/teacher/teacherDashboard";



export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState<"signup" | "login" | "createRoom" | "dashboard">("signup");
  const [teacherId, setTeacherId] = useState<number | null>(null);

  // Signup амжилттай
  const handleSignupSuccess = () => setStep("login");

  // Login амжилттай
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
