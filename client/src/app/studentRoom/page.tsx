"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StudentSignup from "@/components/auth/student/signUp";
import StudentLogin from "@/components/auth/student/signIn";
import StudentDashboard from "@/components/student/StudentDashboard";
import { StudentJoin } from "@/components/student/studentJoin";

export default function Home() {
  const router = useRouter();

  const [step, setStep] = useState<
    "login" | "signup" | "joinclass" | "dashboard"
  >("login");

  const handleSignupSuccess = () => {
    setStep("login");
  };

  const handleLoginSuccess = () => {
    setStep("joinclass");
  };

  const handleNext = (name: string, roomCode: string) => {
    console.log("Student name:", name);
    console.log("Room code:", roomCode);
    setStep("dashboard");
  };

  return (
    <div className="w-full mx-auto space-y-6">
      {step === "signup" && <StudentSignup onSuccess={handleSignupSuccess} />}
      {step === "login" && <StudentLogin onSuccess={handleLoginSuccess} />}
      {step === "joinclass" && <StudentJoin onNext={handleNext} />}
      {step === "dashboard" && <StudentDashboard />}
    </div>
  );
}
