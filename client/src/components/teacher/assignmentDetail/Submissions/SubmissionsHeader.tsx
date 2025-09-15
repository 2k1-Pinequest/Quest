import React, { useState } from "react";
import { Check, X, MessageSquare, Filter, CheckCheck } from "lucide-react";

interface Submission {
  id: string;
  studentName: string;
  assignmentTitle: string;
  score: number;
  aiSuggestion: "approve" | "review";
  status: "pending" | "approved" | "rejected";
  submissionDate: string;
}

const dummySubmissions: Submission[] = [
  {
    id: "1",
    studentName: "Alice Johnson",
    assignmentTitle: "React Components Lab",
    score: 92,
    aiSuggestion: "approve",
    status: "pending",
    submissionDate: "2025-01-15 14:30",
  },
  {
    id: "2",
    studentName: "Bob Smith",
    assignmentTitle: "JavaScript Functions",
    score: 76,
    aiSuggestion: "review",
    status: "pending",
    submissionDate: "2025-01-15 16:45",
  },
  {
    id: "3",
    studentName: "Carol Davis",
    assignmentTitle: "CSS Flexbox Project",
    score: 88,
    aiSuggestion: "approve",
    status: "approved",
    submissionDate: "2025-01-14 12:20",
  },
  {
    id: "4",
    studentName: "David Wilson",
    assignmentTitle: "API Integration Task",
    score: 65,
    aiSuggestion: "review",
    status: "pending",
    submissionDate: "2025-01-15 18:10",
  },
  {
    id: "5",
    studentName: "Emma Brown",
    assignmentTitle: "Database Design",
    score: 94,
    aiSuggestion: "approve",
    status: "pending",
    submissionDate: "2025-01-15 09:15",
  },
  {
    id: "6",
    studentName: "Frank Miller",
    assignmentTitle: "React Components Lab",
    score: 58,
    aiSuggestion: "review",
    status: "rejected",
    submissionDate: "2025-01-14 20:30",
  },
];

export const SubmissionsHeader = () => {
  const [submissions, setSubmissions] =
    useState<Submission[]>(dummySubmissions);

  const [filter, setFilter] = useState<
    "all" | "suggested-approve" | "suggested-review" | "approved"
  >("all");

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);

  const filteredSubmissions = submissions.filter((submission) => {
    switch (filter) {
      case "suggested-approve":
        return submission.aiSuggestion === "approve";
      case "suggested-review":
        return submission.aiSuggestion === "review";
      case "approved":
        return submission.status === "approved";
      default:
        return true;
    }
  });

  const bulkApproveAISuggestions = () => {
    setSubmissions((prev) =>
      prev.map((submission) =>
        submission.aiSuggestion === "approve" && submission.status === "pending"
          ? { ...submission, status: "approved" }
          : submission
      )
    );
  };

  const updateSubmissionStatus = (
    id: string,
    status: "approved" | "rejected"
  ) => {
    setSubmissions((prev) =>
      prev.map((submission) =>
        submission.id === id ? { ...submission, status } : submission
      )
    );
  };

  const openFeedbackModal = (submission: Submission) => {
    setSelectedSubmission(submission);
    setShowFeedbackModal(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getAISuggestionBadge = (suggestion: string) => {
    return suggestion === "approve"
      ? "bg-blue-100 text-blue-700"
      : "bg-yellow-100 text-yellow-700";
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const pendingApprovalCount = submissions.filter(
    (s) => s.aiSuggestion === "approve" && s.status === "pending"
  ).length;

  return (
    <div className="bg-white rounded-2xl shadow">
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

      {/* Submissions Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-6 font-medium text-gray-700">
                Student
              </th>
              {/* <th className="text-left py-3 px-6 font-medium text-gray-700">
                Assignment
              </th> */}
              <th className="text-left py-3 px-6 font-medium text-gray-700">
                Score
              </th>
              <th className="text-left py-3 px-6 font-medium text-gray-700">
                AI Suggestion
              </th>
              <th className="text-left py-3 px-6 font-medium text-gray-700">
                Status
              </th>
              <th className="text-left py-3 px-6 font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions.map((submission) => (
              <tr
                key={submission.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {submission.studentName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <span className="font-medium text-gray-900">
                      {submission.studentName}
                    </span>
                  </div>
                </td>
                {/* <td className="py-4 px-6 text-gray-700">
                  {submission.assignmentTitle}
                </td> */}
                <td className="py-4 px-6">
                  <span
                    className={`font-bold ${getScoreColor(submission.score)}`}
                  >
                    {submission.score}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getAISuggestionBadge(
                      submission.aiSuggestion
                    )}`}
                  >
                    {submission.aiSuggestion === "approve"
                      ? "Suggested Approve"
                      : "Needs Attention"}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                      submission.status
                    )}`}
                  >
                    {submission.status.charAt(0).toUpperCase() +
                      submission.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex gap-2">
                    {submission.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            updateSubmissionStatus(submission.id, "approved")
                          }
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                          title="Approve"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() =>
                            updateSubmissionStatus(submission.id, "rejected")
                          }
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Reject"
                        >
                          <X size={16} />
                        </button>
                      </>
                    )}
                    {submission.aiSuggestion === "review" && (
                      <button
                        onClick={() => openFeedbackModal(submission)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="View Feedback"
                      >
                        <MessageSquare size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Feedback Modal */}
      {/* {showFeedbackModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedSubmission.studentName}
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedSubmission.assignmentTitle}
                </p>
              </div>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-gray-700">
                  Score:{" "}
                </span>
                <span
                  className={`font-bold ${getScoreColor(
                    selectedSubmission.score
                  )}`}
                >
                  {selectedSubmission.score}
                </span>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">
                  AI Feedback:
                </h4>
                <p className="text-sm text-yellow-700">
                  This submission may need more explanation or has a lower score
                  than expected. Please review the work carefully and consider
                  providing additional feedback to help the student improve.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    updateSubmissionStatus(selectedSubmission.id, "approved");
                    setShowFeedbackModal(false);
                  }}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 font-medium"
                >
                  Approve Anyway
                </button>
                <button
                  onClick={() => {
                    updateSubmissionStatus(selectedSubmission.id, "rejected");
                    setShowFeedbackModal(false);
                  }}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 font-medium"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};
