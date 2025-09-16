import React from "react";
import { Submission } from "@/types";
import { SubmissionRow } from "./SubmissionRow";

interface Props {
  submissions: Submission[];
  setSubmissions: React.Dispatch<React.SetStateAction<Submission[]>>;
  filter: "all" | "suggested-approve" | "suggested-review" | "approved";
}

export const SubmissionsTable: React.FC<Props> = ({ submissions, setSubmissions, filter }) => {
  const filteredSubmissions = submissions.filter((s) => {
    switch (filter) {
      case "suggested-approve":
        return s.aiSuggestions[0] === "approve";
      case "suggested-review":
        return s.aiSuggestions[0] === "review";
      case "approved":
        return s.teacherReview?.status === "approved";
      default:
        return true;
    }
  });

  const updateSubmissionStatus = (id: string, status: "approved" | "rejected") => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              teacherReview: { ...s.teacherReview, status, comment: s.teacherReview?.comment ?? "", finalScore: s.aiScore },
            }
          : s
      )
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left py-3 px-6 font-medium text-gray-700">Student</th>
            <th className="text-left py-3 px-6 font-medium text-gray-700">Score</th>
            <th className="text-left py-3 px-6 font-medium text-gray-700">AI Suggestion</th>
            <th className="text-left py-3 px-6 font-medium text-gray-700">Status</th>
            <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubmissions.map((submission) => (
            <SubmissionRow
              key={submission.id}
              submission={submission}
              updateSubmissionStatus={updateSubmissionStatus}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
