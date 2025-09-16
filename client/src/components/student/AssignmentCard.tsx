"use client";

import { Assignment } from "@/types";
import { BookOpen, Upload } from "lucide-react";

interface AssignmentCardProps {
  assignment: {
    id: string;
    title: string;
    instruction: string;
    createdAt: string;
    roomId: string
  };
  onSelect: (assignment: Assignment) => void;
}

export default function AssignmentCard({ assignment, onSelect }: AssignmentCardProps) {
  return (
    <div className="bg-white  p-4 hover:shadow-xl transition flex flex-col  w-full">
      <div className="flex items-center space-x-2 mb-2">
        <BookOpen size={20} className="text-blue-500" />
        <h4 className="font-semibold text-md line-clamp-2">{assignment.title}</h4>
      </div>

      <div
        className="text-gray-600 text-sm mb-2 overflow-y-auto"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
        }}
      >
        {assignment.instruction}
      </div>

      <div className="mt-auto flex flex-col">
        <span className="text-xs text-gray-500 mb-1">
          Ирсэн хугацаа: {assignment.createdAt}
        </span>
        <button
          onClick={() => onSelect(assignment)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl flex items-center justify-center space-x-2"
        >
          <Upload size={16} /> <span>Даалгавар илгээх</span>
        </button>
      </div>
    </div>
  );
}
