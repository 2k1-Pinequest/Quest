import React, { useState } from "react";
import { CheckCheck } from "lucide-react";

import { SubmissionsTable } from "./SubmissionTable";
import { dummySubmissions } from "@/components/data/dummyData";

export interface Submission {
  id: string;
  studentName: string;
  assignmentTitle: string;
  score: number;
  aiSuggestion: "approve" | "review";
  status: "pending" | "approved" | "rejected";
  submissionDate: string;
}

export const SubmissionsAssignments = () => {
  const [submissions, setSubmissions] =
    useState<Submission[]>(dummySubmissions);

  const [filter, setFilter] = useState<
    "all" | "suggested-approve" | "suggested-review" | "approved"
  >("all");

  const bulkApproveAISuggestions = () => {
    setSubmissions((prev) =>
      prev.map((submission) =>
        submission.aiSuggestion === "approve" && submission.status === "pending"
          ? { ...submission, status: "approved" }
          : submission
      )
    );
  };

  const pendingApprovalCount = submissions.filter(
    (s) => s.aiSuggestion === "approve" && s.status === "pending"
  ).length;

  return (
    <div className="bg-white rounded-2xl w-full shadow-lg">
      {/* Header with Bulk Actions */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Student Submissions
          </h2>
          <div className="flex gap-3">
            {pendingApprovalCount > 0 && (
              <button
                onClick={bulkApproveAISuggestions}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                <CheckCheck size={16} />
                Bulk Approve AI Suggestions ({pendingApprovalCount})
              </button>
            )}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Submissions</option>
              <option value="suggested-approve">Suggested Approve</option>
              <option value="suggested-review">Suggested Review</option>
              <option value="approved">Approved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <SubmissionsTable
        submissions={submissions}
        setSubmissions={setSubmissions}
        filter={filter}
      />
    </div>
  );
};
