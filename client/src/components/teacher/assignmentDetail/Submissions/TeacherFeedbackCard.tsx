"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface TeacherType {
  teacherFeedback: string;
  setTeacherFeedback: (value: string) => void;
  handleSubmitFeedback: (status: "approved" | "rejected") => void;
  isSubmitting: boolean;
}

export const TeacherFeedbackCard = ({
  teacherFeedback,
  setTeacherFeedback,
  handleSubmitFeedback,
  isSubmitting,
}: TeacherType) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" /> Teacher Feedback
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="feedback" className="text-sm font-medium">
            Provide feedback for the student (optional)
          </Label>
          <Textarea
            id="feedback"
            placeholder="Enter your feedback here..."
            value={teacherFeedback}
            onChange={(e) => setTeacherFeedback(e.target.value)}
            className="mt-2 min-h-[100px]"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            onClick={() => handleSubmitFeedback("approved")}
            disabled={isSubmitting}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? "Submitting..." : "Approve Submission"}
          </Button>
          <Button
            onClick={() => handleSubmitFeedback("rejected")}
            disabled={isSubmitting}
            variant="destructive"
            className="flex-1"
          >
            {isSubmitting ? "Submitting..." : "Reject Submission"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
