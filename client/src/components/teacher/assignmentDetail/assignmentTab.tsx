"use client";

import { useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";
import { OverviewCarts } from "./Stats/overviewCarts";
import { Distribution } from "./Stats/distribution";
import SubmissionsAssignments from "./Submissions/SubmissionAssignments";
import { useParams } from "next/navigation";
import axios from "axios";
import { Submission } from "@/types";

interface SubmissionAPI {
  id: number;
  answerText: string | null;
  fileUrl: string | null;
  submittedAt: string;
  student: {
    studentName: string;
    roomCode: string;
  };
  aiAnalysis?: {
    score: number;
    overall: string;
    suggestions: string[];
  } | null;
}

export const AssignmentTab = () => {
  const params = useParams();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true); // анх true
  const [selectedTab, setSelectedTab] = useState<"submissions" | "stats">(
    "submissions"
  );

  useEffect(() => {
    if (!params.assignId) return;

    setLoading(true);

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/assignments/subs/${params.assignId}`)
      .then((res) => {
        const submissionsFromAPI: Submission[] = res.data.submissions.map(
          (s: SubmissionAPI) => ({
            id: s.id.toString(),
            studentName: s.student.studentName,
            roomCode: s.student.roomCode,
            content: s.answerText || s.fileUrl || "",
            type: s.fileUrl ? "upload" : "text",
            aiScore: s.aiAnalysis?.score || 0,
            aiFeedback: s.aiAnalysis?.overall || "",
            aiSuggestions: s.aiAnalysis?.suggestions || [],
            submittedAt: new Date(s.submittedAt),
          })
        );

        setSubmissions(submissionsFromAPI);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [params.assignId]);

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-[1200px] px-4 sm:px-6 bg-white rounded-2xl">
        {/* Tabs */}
        <nav className="flex bg-gray-100 rounded-lg">
          <button
            onClick={() => setSelectedTab("submissions")}
            className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
              selectedTab === "submissions"
                ? "bg-white shadow text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Гэрийн Даалгавар ({submissions.length})
          </button>

          <button
            onClick={() => setSelectedTab("stats")}
            className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
              selectedTab === "stats"
                ? "bg-white shadow text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Тоон үзүүлэлт
          </button>
        </nav>

        {/* Content */}
        <div className="mt-4 p-6 min-h-[200px]">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-lg">Уншиж байна...</p>
            </div>
          ) : selectedTab === "submissions" ? (
            <SubmissionsAssignments />
          ) : (
            <div className="flex flex-col gap-6">
              <OverviewCarts submissions={submissions} />
              <Distribution submissions={submissions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
