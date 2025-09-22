"use client";

import React, { useState } from "react";

import { TeacherClassRoomHeader } from "@/components/teacher/Assign/teacherClassroomHeader";
import { TeacherClassRooms } from "@/components/teacher/Assign/teacherDashboard";
import TeacherLogin from "@/components/auth/teacher/sign-in";
import TeacherSignup from "@/components/auth/teacher/sign-up";

export default function Home() {
  const [step, setStep] = useState<"login" | "signup" | "dashboard">("login");
  const [teacherId, setTeacherId] = useState<number | null>(null);
  const [hasRoom, setHasRoom] = useState<boolean>(false);

  return (
    <div>
      {step === "login" && (
        <TeacherLogin
          onSuccess={(id, room) => {
            setTeacherId(id);
            setHasRoom(room);
            setStep("dashboard");
          }}
          onSwitchToSignup={() => setStep("signup")}
        />
      )}

      {step === "signup" && (
        <TeacherSignup
          onSuccess={(id, room) => {
            setTeacherId(id);
            setHasRoom(room);
            setStep("dashboard");
          }}
          onSwitchToLogin={() => setStep("login")}
        />
      )}

      {step === "dashboard" && teacherId && (
        <div>
          <TeacherClassRoomHeader />
          <TeacherClassRooms teacherId={teacherId} />
        </div>
      )}
    </div>
  );
}
