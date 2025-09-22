"use client";

import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { CalendarDays } from "lucide-react";
interface AssignmentItemProps {
  id: number;
  title: string;
  submissions: number;
  approvedSubmissions?: number;
  createdAt: string;
  dueDate: string;
  isChecked?: boolean;
}

export const AssignmentItem = ({
  id,
  title,
  submissions,
  createdAt,
  dueDate,
  isChecked,
  approvedSubmissions,
}: AssignmentItemProps) => {
  const router = useRouter();

  const parsedCreatedAt = createdAt ? new Date(createdAt) : null;
  const createdDateStr = parsedCreatedAt
    ? (() => {
        const localDate = new Date(
          parsedCreatedAt.getTime() + 8 * 60 * 60 * 1000
        );
        const y = localDate.getFullYear();
        const m = String(localDate.getMonth() + 1).padStart(2, "0");
        const d = String(localDate.getDate()).padStart(2, "0");
        const h = String(localDate.getHours()).padStart(2, "0");
        const min = String(localDate.getMinutes()).padStart(2, "0");
        return `${y}.${m}.${d} ${h}:${min}`;
      })()
    : "No date";

  const parsedDueDate = dueDate ? new Date(dueDate) : null;
  const dueDateStr = parsedDueDate
    ? (() => {
        const localDate = new Date(
          parsedDueDate.getTime() + 8 * 60 * 60 * 1000
        );
        const y = localDate.getFullYear();
        const m = String(localDate.getMonth() + 1).padStart(2, "0");
        const d = String(localDate.getDate()).padStart(2, "0");
        const h = String(localDate.getHours()).padStart(2, "0");
        const min = String(localDate.getMinutes()).padStart(2, "0");
        return `${y}.${m}.${d} ${h}:${min}`;
      })()
    : "No date";

  const now = new Date();
  let dateColor = "bg-white";

  if (parsedDueDate) {
    const diff = parsedDueDate.getTime() - now.getTime();
    if (diff < 0) {
      dateColor = "bg-gray-200";
    }
  }

  return (
    <div
      className={`rounded-2xl p-8 border-[1px] cursor-pointer hover:shadow-xl overflow-hidden max-h-[150px] min-h-[150px] transition
    ${isChecked ? "border-gray-400 bg-gray-50" : "border-gray-200 bg-white"}`}
      onClick={() => router.push(`/teacherAssignmentDetail/${id}`)}
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-sm text-gray-800 flex items-center gap-1.5">
          <CalendarDays /> {createdDateStr}
        </h3>
        <div>
          <h4 className="text-l font-semibold text-gray-900 overflow-hidden whitespace-nowrap text-ellipsis">
            {title}
          </h4>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {approvedSubmissions}/{submissions} шалгасан
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/teacherAssignmentDetail/${id}`);
            }}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};
