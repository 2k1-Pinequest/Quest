"use client";

import React from "react";
import { AssignmentDetails } from "./assignmentSubAnalyze";
import { useParams, useSearchParams } from "next/navigation";

export default function TeacherAssignDetail() {
  // URL динамик segment-аас авах (жишээ нь: /teacher/[id])
  const params = useParams();

  // URL query string-ээс авах (жишээ нь: ?subject=math&level=10)
  const searchParams = useSearchParams();

  console.log("params 👉", params);
  console.log("searchParams 👉", searchParams.toString());
  console.log("subject 👉", searchParams.get("subject"));

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-[1200px]">
        <AssignmentDetails
          title={searchParams.get("subject") || "math"}
          description="tailbar"
        />
      </div>
    </div>
  );
}
