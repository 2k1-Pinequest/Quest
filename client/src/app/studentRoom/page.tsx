"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StudentSignup from "@/components/auth/student/signUp";
import StudentLogin from "@/components/auth/student/signIn";
import StudentDashboard from "@/components/student/StudentDashboard";

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
    router.push("/studentRoom/dashboard"); // Dashboard руу redirect
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      {step === "signup" && <StudentSignup onSuccess={handleSignupSuccess} />}
      {step === "login" && <StudentLogin onSuccess={handleLoginSuccess} />}
      {step === "dashboard" && <StudentDashboard />}
    </div>
  );
}
