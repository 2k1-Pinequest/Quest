"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Submission } from "@/types";
import { OverviewCards } from "./OverviewCards";
import { OverviewDetails } from "./OverviewDetails";
import { TeacherFeedbackCard } from "./TeacherFeedbackCard";

interface AssignDialogProps {
  selectedSubmission: Submission | null;
  showDetailModal: boolean;
  setShowDetailModal: (open: boolean) => void;
}

export const AssignDialog = ({
  selectedSubmission,
  showDetailModal,
  setShowDetailModal,
}: AssignDialogProps) => {
  const [isEditingScore, setIsEditingScore] = useState(false);
  const [editedScore, setEditedScore] = useState<number | null>(null);

  const [teacherFeedback, setTeacherFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Score edit functions
  const handleScoreEdit = () => {
    setEditedScore(selectedSubmission?.aiScore ?? 0);
    setIsEditingScore(true);
  };

  const handleScoreChange = (value: number) => {
    setEditedScore(value);
  };

  const handleScoreSave = () => {
    if (selectedSubmission && editedScore !== null) {
      selectedSubmission.aiScore = editedScore;
    }
    setIsEditingScore(false);
  };

  const handleScoreCancel = () => {
    setEditedScore(null);
    setIsEditingScore(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const handleSubmitFeedback = (status: "approved" | "rejected") => {
    if (!selectedSubmission) return;
    setIsSubmitting(true);

    selectedSubmission.teacherReview = {
      status,
      comment: teacherFeedback,
      finalScore: editedScore ?? selectedSubmission.aiScore,
    };

    setIsSubmitting(false);
    setShowDetailModal(false);
  };

  return (
    <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {selectedSubmission?.studentName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <div className="text-xl font-bold">
                {selectedSubmission?.studentName}
              </div>
              <div className="text-sm text-gray-600 font-normal">
                assignmentTitle
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        {selectedSubmission && (
          <div className="space-y-6">
            {/* Overview Cards */}
            <OverviewCards
              isEditingScore={isEditingScore}
              editedScore={editedScore}
              selectedSubmission={selectedSubmission}
              handleScoreChange={handleScoreChange}
              handleScoreSave={handleScoreSave}
              handleScoreCancel={handleScoreCancel}
              handleScoreEdit={handleScoreEdit}
              getScoreColor={getScoreColor}
            />

            {/* Overview Details */}
            <OverviewDetails selectedSubmission={selectedSubmission} />

            {/* Teacher Feedback */}
            {selectedSubmission.teacherReview?.status === "pending" && (
              <TeacherFeedbackCard
                teacherFeedback={teacherFeedback}
                setTeacherFeedback={setTeacherFeedback}
                handleSubmitFeedback={handleSubmitFeedback}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
