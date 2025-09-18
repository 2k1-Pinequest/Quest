"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { FileText, Brain } from "lucide-react";
import { Submission } from "@/types";

interface OverviewDetailsProps {
  selectedSubmission: Submission;
}

export const OverviewDetails = ({
  selectedSubmission,
}: OverviewDetailsProps) => {
  return (
    <div className="space-y-6">
      {/* Submission Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Submission Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">
            {selectedSubmission.content ||
              "No additional submission details available."}
          </p>
        </CardContent>
      </Card>

      {/* AI Evaluation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            AI Evaluation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`p-4 rounded-lg ${
              selectedSubmission?.aiSuggestions?.includes("approve")
                ? "bg-green-50 border border-green-200"
                : "bg-yellow-50 border border-yellow-200"
            }`}
          >
            <p
              className={`text-sm ${
                selectedSubmission?.aiSuggestions?.includes("approve")
                  ? "text-green-800"
                  : "text-yellow-800"
              }`}
            >
              {selectedSubmission.aiFeedback ||
                "No AI evaluation available for this submission."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
