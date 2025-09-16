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
      className="bg-white rounded-2xl border p-6 cursor-pointer hover:shadow-xl transition"
      onClick={() => router.push(`/teacherAssignmentDetail/${id}`)}
    >
      <div className="flex flex-col gap-2 ">
        <div>
          <h3 className="text-sm text-gray-800">09.17</h3>
          <div className="">
            <h4 className="text-xl font-semibold text-gray-900">{title}</h4>
            <p className="text-gray-600 font-medium mt-1">{description}</p>
          </div>
          {/* {submissions === 0 && (
            <div className="text-center py-8 text-gray-500">
              No submissions yet
            </div>
          )} */}
        </div>
        <div className="text-xs text-gray-500">{submissions} submission(s)</div>
      </div>
    </div>
  );
};
