"use client";

import React, { useState } from "react";
import { Check, X, MessageSquare } from "lucide-react";

import { Input } from "@/components/ui/input";

export const GurvanUildel = () => {
  const [showFeedbackInput, setShowFeedbackInput] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleSubmitFeedback = (action: "approve" | "reject") => {
    console.log(`Action: ${action}, Feedback:`, feedback);
    setFeedback("");
    setShowFeedbackInput(false);
  };

  return (
    <div className="flex flex-col items-end gap-2 relative">
      <div className="flex gap-2">
        <button
          className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
          title="Approve"
          onClick={() => handleSubmitFeedback("approve")}
        >
          <Check size={20} />
        </button>

        <button
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
          title="Reject"
          onClick={() => handleSubmitFeedback("reject")}
        >
          <X size={20} />
        </button>

        <div className="relative">
          <button
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
            title="View Feedback"
            onClick={() => setShowFeedbackInput((prev) => !prev)}
          >
            <MessageSquare size={20} />
          </button>

          {showFeedbackInput && (
            <div className="absolute bottom-full left-0 -translate-x-[260px] mb-2 w-80 p-4 bg-white shadow-lg rounded-lg z-50">
              <Input
                placeholder="Санал хүсэлтээ явуулна уу"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
