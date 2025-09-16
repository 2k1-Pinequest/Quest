import React, { useState } from "react";
import { Check, X, MessageSquare } from "lucide-react";
import { Submission } from "@/types";
import { AISuggestionBadge, StatusBadge } from "./badge";
import { getScoreColor } from "@/utils/utils";
import { AssignDialog } from "./AssignDialog";

interface Props {
  submission: Submission;
  updateSubmissionStatus: (id: string, status: "approved" | "rejected") => void;
}

export const SubmissionRow: React.FC<Props> = ({ submission, updateSubmissionStatus }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  const handleOpenDialog = () => {
    setSelectedSubmission(submission);
    setShowDialog(true);
  };

  return (
    <>
      <tr className="border-b border-3 border-gray-100 hover:bg-gray-50">
        <td className="py-4 px-6">
          <span className="font-medium text-gray-900">{submission.studentName}</span>
        </td>
        <td className="py-4 px-6">
          <span className={`font-bold ${getScoreColor(submission.aiScore)}`}>
            {submission.aiScore}
          </span>
        </td>
        <td className="py-4 px-6">
          <AISuggestionBadge suggestion={submission.aiSuggestions[0]} />
        </td>
        <td className="py-4 px-6">
          <StatusBadge status={submission.teacherReview?.status ?? "pending"} />
        </td>
        <td className="py-4 px-6">
          <div className="flex gap-2">
            {submission.teacherReview?.status === "pending" && (
              <>
                <button
                  onClick={() => updateSubmissionStatus(submission.id, "approved")}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                  title="Approve"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => updateSubmissionStatus(submission.id, "rejected")}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  title="Reject"
                >
                  <X size={16} />
                </button>
              </>
            )}
            {submission.aiSuggestions[0] === "review" && (
              <button
                onClick={handleOpenDialog}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                title="View Feedback"
              >
                <MessageSquare size={16} />
              </button>
            )}
          </div>
        </td>
      </tr>

      {/* Dialog */}
      <AssignDialog
        selectedSubmission={selectedSubmission}
        showDetailModal={showDialog}
        setShowDetailModal={setShowDialog}
      />
    </>
  );
};
