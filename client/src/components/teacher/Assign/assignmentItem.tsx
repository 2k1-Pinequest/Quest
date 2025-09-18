"use client";

import { useRouter } from "next/navigation";

interface AssignmentItemProps {
  id: number;
  title: string;
  description: string;
  submissions: number;
  createdAt: string;
  dueDate: string;
}

export const AssignmentItem = ({
  id,
  title,
  description,
  submissions,
  createdAt,
  dueDate,
}: AssignmentItemProps) => {
  const router = useRouter();

  const parsedCreatedAt = createdAt ? new Date(createdAt) : null;
  const createdDateStr = parsedCreatedAt
    ? (() => {
        const localDate = new Date(parsedCreatedAt.getTime() + 8 * 60 * 60 * 1000);
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
        const localDate = new Date(parsedDueDate.getTime() + 8 * 60 * 60 * 1000);
        const y = localDate.getFullYear();
        const m = String(localDate.getMonth() + 1).padStart(2, "0");
        const d = String(localDate.getDate()).padStart(2, "0");
        const h = String(localDate.getHours()).padStart(2, "0");
        const min = String(localDate.getMinutes()).padStart(2, "0");
        return `${y}.${m}.${d} ${h}:${min}`;
      })()
    : "No date";

  // dateColor-г бүх div-д ашиглах
const now = new Date();
let dateColor = "bg-white"; // default: хугацаа дуусаагүй

if (parsedDueDate) {
  const diff = parsedDueDate.getTime() - now.getTime();
  if (diff < 0) {
    dateColor = "bg-gray-400"; // хугацаа дууссан
  }
}

  return (
    <div
      className={`rounded-2xl p-6 border-[1px] cursor-pointer hover:shadow-xl overflow-auto max-h-[150px] min-h-[150px] transition ${dateColor}`}
      onClick={() => router.push(`/teacherAssignmentDetail/${id}`)}
    >
      <div className="flex flex-col gap-2  ">
        <h3 className="text-sm text-gray-800">Үүсгэсэн: {createdDateStr}</h3>
        {/* <h3 className="text-sm font-medium">Дуусах: {dueDateStr}</h3> */}
        <div>
          <h4 className="text-xl font-semibold text-gray-900">{title}</h4>
          <p className="text-gray-600 font-medium mt-1">{description}</p>
          
        </div>
        <div className="text-xs text-gray-500">submission({submissions})</div>
      </div>
    </div>
  );
};
