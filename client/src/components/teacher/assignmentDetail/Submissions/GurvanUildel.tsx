"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import axios from "axios";

interface ZuwUildelProps {
  submissionId: number;
  aiAnalysis: {
    score: number;
    summary: string;
    mistakes: string[];
    suggestions: string[];
    overall: string;
  } | null;
  onSubmissionUpdated: () => void;
}

export const ZuwUildel: React.FC<ZuwUildelProps> = ({
  submissionId,
  aiAnalysis,
  onSubmissionUpdated,
}) => {
  const [score, setScore] = useState<number | undefined>(aiAnalysis?.score);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmitFeedback = async () => {
    try {
      const validScore = score !== undefined && !isNaN(score) ? score : 0;

      const payload = {
        teacherScore: validScore,
      };

      await axios.put(
        `http://localhost:4200/teacher/approvedSub/${submissionId}`,
        payload
      );

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

      onSubmissionUpdated();
    } catch (err) {
      console.error("Алдаа гарлаа:", err);
    }
  };

  return (
    <div className="flex flex-col items-end gap-2 relative">
      {showSuccess && (
        <div className="p-2 text-sm text-white bg-green-500 rounded-lg">
          Даалгавар амжилттай батлагдлаа! 🎉
        </div>
      )}

      <input
        type="number"
        className="w-24 border rounded-lg p-2"
        placeholder="Оноо"
        value={score || ""}
        onChange={(e) => setScore(Number(e.target.value))}
      />

      <div className="flex gap-2">
        <button
          className="p-2 text-green-600 hover:bg-green-50 rounded-lg border-2"
          title="Approve"
          onClick={handleSubmitFeedback}
        >
          <Check size={20} />
        </button>
      </div>
    </div>
  );
};
