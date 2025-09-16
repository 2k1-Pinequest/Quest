"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Clock, Brain, Check, X, Edit3 } from "lucide-react";
import { Submission } from "@/types";

interface OverviewCardsProps {
  isEditingScore: boolean;
  editedScore: number | null;
  selectedSubmission: Submission;
  handleScoreChange: (value: number) => void;
  handleScoreSave: () => void;
  handleScoreCancel: () => void;
  handleScoreEdit: () => void;
  getScoreColor: (score: number) => string;
}

export const OverviewCards = ({
  isEditingScore,
  editedScore,
  selectedSubmission,
  handleScoreChange,
  handleScoreSave,
  handleScoreCancel,
  handleScoreEdit,
  getScoreColor,
}: OverviewCardsProps) => {
  const maxScore = 100;
  const firstSuggestion = selectedSubmission.aiSuggestions[0] || "review";

  return (
    <div>
      {/* Score Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" /> Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            {isEditingScore ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={editedScore ?? ""}
                  onChange={(e) => handleScoreChange(Number(e.target.value))}
                  min={0}
                  max={maxScore}
                  className="w-20 text-lg font-bold border px-1 py-0.5 rounded"
                  autoFocus
                />
                <span className="text-gray-400 text-lg">/{maxScore}</span>
                <Button size="sm" onClick={handleScoreSave} className="h-8 px-2">
                  <Check size={14} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleScoreCancel}
                  className="h-8 px-2"
                >
                  <X size={14} />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span
                  className={`text-2xl font-bold ${getScoreColor(
                    editedScore ?? selectedSubmission.aiScore
                  )}`}
                >
                  {editedScore ?? selectedSubmission.aiScore}
                </span>
                <span className="text-gray-400">/{maxScore}</span>
                <Button size="sm" variant="ghost" onClick={handleScoreEdit}>
                  <Edit3 size={14} />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Submission Info Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" /> Submitted
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-medium">
            {new Date(selectedSubmission.submittedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </CardContent>
      </Card>

      {/* AI Suggestion Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-500" /> AI Suggestion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span
            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
              firstSuggestion === "approve"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {firstSuggestion === "approve" ? "Approve" : "Review Needed"}
          </span>
        </CardContent>
      </Card>
    </div>
  );
};
