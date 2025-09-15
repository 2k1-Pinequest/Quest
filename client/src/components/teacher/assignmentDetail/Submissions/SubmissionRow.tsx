import React from "react";
import { Check, X, MessageSquare } from "lucide-react";

// import { StatusBadge, AISuggestionBadge } from "./Badges";
// import { getScoreColor, formatInitials } from "@/utils";
import { Submission } from "./SubmissionAssignments";
import { AISuggestionBadge, StatusBadge } from "./badge";
import { getScoreColor } from "@/utils/utils";

interface Props {
  submission: Submission;
  updateSubmissionStatus: (id: string, status: "approved" | "rejected") => void;
}

export const SubmissionRow: React.FC<Props> = ({
  submission,
  updateSubmissionStatus,
}) => {
  return (
    <tr className="border-b border-3 border-gray-100 hover:bg-gray-50">
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          {/* <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium"> */}
            {/* {formatInitials(submission.studentName)} */}
          {/* </div> */}
          <span className="font-medium text-gray-900">
            {submission.studentName}
          </span>
        </div>
      </td>

      <td className="py-4 px-6">
        <span className={`font-bold ${getScoreColor(submission.score)}`}>
          {submission.score}
        </span>
      </td>

      <td className="py-4 px-6">
        <AISuggestionBadge suggestion={submission.aiSuggestion} />
      </td>

      <td className="py-4 px-6">
        <StatusBadge status={submission.status} />
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
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              title="View Feedback"
            >
              <MessageSquare size={16} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};
