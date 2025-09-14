"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import TeacherLogin from "@/components/auth/sign-in";
import TeacherSignup from "@/components/auth/sign-up";
import { TeacherClassRooms } from "@/components/teacher/teacherDashboard";

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState<"signup" | "login" | "dashboard">("signup");

  // Signup амжилттай бол login руу шилжүүлэх
  const handleSignupSuccess = () => {
    setStep("login");
  };

  // Login амжилттай бол dashboard руу шилжүүлэх
  const handleLoginSuccess = () => {
    setStep("dashboard");
    router.push("/teacherRoom/dashboard"); // Dashboard руу redirect
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      {step === "signup" && <TeacherSignup onSuccess={handleSignupSuccess} />}
      {step === "login" && <TeacherLogin onSuccess={handleLoginSuccess} />}
      {step === "dashboard" && <TeacherClassRooms />}
    </div>
  );
}
