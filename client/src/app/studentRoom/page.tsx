"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StudentSignup from "@/components/auth/student/signUp";
import StudentLogin from "@/components/auth/student/signIn";
import StudentDashboard from "@/components/student/StudentDashboard";
import { StudentJoin } from "@/components/student/studentJoin";

export default function Home() {
  const router = useRouter();

  const [studentId, setStudentId] = useState<number | null>(null);

  const [step, setStep] = useState<
    "login" | "signup" | "joinclass" | "dashboard"
  >("login");

  const handleSignupSuccess = () => {
    setStep("login");
  };

  const handleLoginSuccess = (studentId: number) => {
    setStudentId(studentId);
    setStep("joinclass");
  };

  const handleNext = (name: string, roomCode: string) => {
    if (studentId === null) {
      console.error("Student ID is null. Cannot join class.");
      return;
    }
    console.log("Student ID:", studentId);

    console.log("Student name:", name);
    console.log("Room code:", roomCode);
    setStep("dashboard");
    // router.push("/studentRoom/dashboard");
    router.push(`/studentRoom/dashboard?studentId=${studentId}`);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      {step === "signup" && <StudentSignup onSuccess={handleSignupSuccess} />}
      {step === "login" && <StudentLogin onSuccess={handleLoginSuccess} />}
      {step === "joinclass" && studentId !== null && (
        <StudentJoin onNext={handleNext} studentId={studentId} />
      )}
      {step === "dashboard" && <StudentDashboard />}
    </div>
  );
}
