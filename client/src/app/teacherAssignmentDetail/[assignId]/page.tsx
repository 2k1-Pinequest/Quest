"use client";
import React from "react";
import { AssignmentDetails } from "./assignmentSubAnalyze";
import { useSearchParams } from "next/navigation";

export default function TeacherAssignDetail() {
   const searchParams = useSearchParams();
  const title = searchParams.get("title") || "No title";
  const description = searchParams.get("description") || "No description";
  console.log("pls",title)
  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-[1200px]">
        <AssignmentDetails title={title} description={description} />
      </div>
    </div>
  );
}
