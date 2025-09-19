"use client";

import { Assignment } from "@/types";
import { BookOpen, Upload } from "lucide-react";

interface AssignmentCardProps {
  assignment: Assignment;
  onSelect: (assignment: Assignment) => void;
}

export default function AssignmentCard({
  assignment,
  onSelect,
}: AssignmentCardProps) {
  const parsedDueDate = assignment.dueDate
    ? new Date(assignment.dueDate)
    : null;

  const dueDateStr = parsedDueDate
    ? (() => {
        const localDate = new Date(
          parsedDueDate.getTime() + 8 * 60 * 60 * 1000
        ); // UTC+8
        const y = localDate.getFullYear();
        const m = String(localDate.getMonth() + 1).padStart(2, "0");
        const d = String(localDate.getDate()).padStart(2, "0");
        const h = String(localDate.getHours()).padStart(2, "0");
        const min = String(localDate.getMinutes()).padStart(2, "0");
        return `${y}.${m}.${d} ${h}:${min}`;
      })()
    : "No date";

  const now = new Date();
  const isPastDue = parsedDueDate
    ? parsedDueDate.getTime() < now.getTime()
    : false;

  return (
    <div
      className={
        "p-4 hover:shadow-xl transition flex flex-col w-full max-h-[300px] overflow-auto rounded-2xl border"
      }
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <BookOpen size={20} className="text-blue-500" />
          <h4 className="font-semibold text-md line-clamp-2">
            {assignment.title}
          </h4>
        </div>

        {/* Оноо баруун талд */}
        <span className="text-gray-700 text-xs font-medium px-1 py-0.5 rounded">
          {/* {assignment.score ?? "-"} оноо */}
          100/76 
        </span>
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

      <div className="mt-auto flex flex-col gap-2">
        <span className="text-xs text-gray-500">
          Дуусах хугацаа: {dueDateStr}
        </span>

        {isPastDue ? (
          <span className="text-white font-semibold text-center py-2 rounded-xl border  bg-gray-400">
            Хугацаа дууссан
          </span>
        ) : (
          <button
            onClick={() => onSelect(assignment)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl flex items-center justify-center space-x-2"
          >
            <Upload size={16} /> <span>Даалгавар илгээх</span>
          </button>
        )}
      </div>
    </div>
  );
}
