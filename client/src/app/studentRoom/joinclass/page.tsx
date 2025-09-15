"use client";

import { useRouter } from "next/navigation";

import { StudentJoin } from "@/components/student/studentJoin";

export default function JoinClassPage() {
  const router = useRouter();

  const handleNext = (name: string, roomCode: string) => {
    console.log("Student name:", name);
    console.log("Room code:", roomCode);
    router.push("/studentRoom/dashboard");
  };

  return <StudentJoin onNext={handleNext} />;
}
