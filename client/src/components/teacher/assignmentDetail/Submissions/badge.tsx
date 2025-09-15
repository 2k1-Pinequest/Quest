import React from "react";

export const StatusBadge = ({ status }: { status: string }) => {
  const styles =
    status === "approved"
      ? "bg-green-100 text-green-700"
      : status === "rejected"
      ? "bg-red-100 text-red-700"
      : "bg-gray-100 text-gray-700";

  return (
    <span
      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${styles}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export const AISuggestionBadge = ({ suggestion }: { suggestion: string }) => {
  const styles =
    suggestion === "approve"
      ? "bg-blue-100 text-blue-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <span
      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${styles}`}
    >
      {suggestion === "approve" ? "Suggested Approve" : "Needs Attention"}
    </span>
  );
};
