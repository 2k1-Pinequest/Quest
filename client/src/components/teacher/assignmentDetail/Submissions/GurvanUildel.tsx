import React, { useState } from "react";
import { Check, X, MessageSquare } from "lucide-react";
import { Submission } from "@/types";

export const GurvanUildel = () => {
  return (
    <div className="flex justify-end">
      <button
        className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
        title="Approve"
      >
        <Check size={20} />
      </button>
      <button
        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
        title="Reject"
      >
        <X size={20} />
      </button>

      <button
        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
        title="View Feedback"
      >
        <MessageSquare size={20} />
      </button>
    </div>
  );
};
