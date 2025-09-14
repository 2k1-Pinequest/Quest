"use client";

import { useRouter } from "next/navigation";

interface AssignmentItemProps {
  id: number;
  title: string;
  description: string;
  submissions: number;
}

export const AssignmentItem = ({
  id,
  title,
  description,
  submissions,
}: AssignmentItemProps) => {
  const router = useRouter();

  return (
    <div
      className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition"
      onClick={() => router.push(`/teacherAssignmentDetail/${id}`)}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
        <div className="text-sm text-gray-500">{submissions} submission(s)</div>
      </div>

      {submissions === 0 && (
        <div className="text-center py-8 text-gray-500">No submissions yet</div>
      )}
    </div>
  );
};

