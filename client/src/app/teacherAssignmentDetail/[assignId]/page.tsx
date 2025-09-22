"use client";

import React from "react";
import { AssignmentDetails } from "./assignmentSubAnalyze";
import { useParams, useSearchParams } from "next/navigation";

export default function TeacherAssignDetail() {
  const params = useParams();
  const searchParams = useSearchParams();

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-[1200px]">
        <AssignmentDetails />
      </div>
    </div>
  );
}
