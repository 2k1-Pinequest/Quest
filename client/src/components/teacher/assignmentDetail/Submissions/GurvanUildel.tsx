// components/GurvanUildel.tsx
"use client";

import React, { useState, useEffect } from "react";
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
  initialTeacherScore?: number; // API-аас хадгалагдсан багшийн оноо
  initialApproved?: boolean; // API-аас хадгалагдсан батлагдсан төлөв
  onSubmissionUpdated: () => void;
}

export const ZuwUildel: React.FC<ZuwUildelProps> = ({
  submissionId,
  aiAnalysis,
  initialTeacherScore,
  initialApproved,
  onSubmissionUpdated,
}) => {
  const [score, setScore] = useState<number | undefined>(
    initialTeacherScore ?? undefined
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [approved, setApproved] = useState(initialApproved ?? false);

  // 🚩 Анхны оноог input дээр AI оноо болгон тавих
  useEffect(() => {
    if (
      score === undefined &&
      aiAnalysis?.score !== null &&
      aiAnalysis?.score !== undefined
    ) {
      setScore(aiAnalysis.score);
    }
  }, [aiAnalysis, score]);

  const handleSubmitFeedback = async () => {
    if (score === undefined || isNaN(score)) {
      console.warn("Оноо байхгүй байна");
      return;
    }

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/teacher/approvedSub/${submissionId}`,
        { teacherScore: score }
      );

      setShowSuccess(true);
      setApproved(true);

      setTimeout(() => setShowSuccess(false), 3000);

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

      {/* Батлагдсан үед оноо хэвээр харагдах, input алга */}
      {approved ? (
        <div className="text-lg font-semibold text-gray-800">
          Оноо: {score !== undefined ? score : "—"}
        </div>
      ) : (
        <input
          type="number"
          className="w-24 border rounded-lg p-2"
          placeholder="Оноо"
          value={score !== undefined ? score : ""}
          onChange={(e) => setScore(Number(e.target.value))}
        />
      )}

      {/* Батлагдаагүй үед approve товч харагдана */}
      {!approved && (
        <div className="flex gap-2">
          <button
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg border-2"
            title="Approve"
            onClick={handleSubmitFeedback}
          >
            <Check size={20} />
          </button>
        </div>
      )}

      {/* Батлагдсан тэмдэг */}
      {approved && (
        <div className="text-green-600 font-medium">✓ Батлагдсан</div>
      )}
    </div>
  );
};
