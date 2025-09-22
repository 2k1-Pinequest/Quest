"use client";

import { CirclePlus } from "lucide-react";
import { AssignmentItem } from "./assignmentItem";
import { Assignment } from "@/types";
import { AssignmentSkeleton } from "./AssignmentSkeleton";

interface Props {
  loading: boolean;
  assignments: Assignment[];
  activeClassroomId: number | null;
}

export const AssignmentList = ({
  loading,
  assignments,
  activeClassroomId,
}: Props) => {
  const groupedAssignments = assignments.reduce(
    (acc: Record<string, Assignment[]>, assignment) => {
      const dateKey = new Date(assignment.createdAt)
        .toISOString()
        .split("T")[0];
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(assignment);
      return acc;
    },
    {}
  );

  const sortedDates = Object.keys(groupedAssignments).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("mn-MN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Skeleton
  if (loading) return <AssignmentSkeleton />;

  // Empty state
  if (assignments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] text-gray-500 text-center">
        {!activeClassroomId ? (
          <p className="text-lg font-medium">Эхлээд ангиа сонгоно уу</p>
        ) : (
          <>
            <CirclePlus size={48} className="mb-4 text-gray-400" />
            <p className="text-lg font-medium">
              Одоогоор даалгавар байхгүй байна
            </p>
            <p className="text-sm">
              Шинэ даалгавар үүсгэх товчийг дарж эхлүүлээрэй
            </p>
          </>
        )}
      </div>
    );
  }

  const checkedAssignments = assignments.filter((a) => a.isChecked);
  const uncheckedAssignments = assignments.filter((a) => !a.isChecked);

  return (
    <div className="flex flex-col gap-8">
      {/* Шалгаагүй */}
      {uncheckedAssignments.length > 0 && (
        <div>
          <div className="flex items-center space-x-4 my-6">
            <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
              {" "}
              Шалгаагүй{" "}
            </span>
            <div className="flex-1 border-t border-gray-300" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {uncheckedAssignments.map((a) => (
              <AssignmentItem
                key={a.id}
                id={a.id}
                title={a.title}
                submissions={a.totalSubmissions ?? 0}
                createdAt={a.createdAt}
                dueDate={a.dueDate || ""}
                isChecked={a?.isChecked}
                approvedSubmissions={a?.approvedSubmissions}
              />
            ))}
          </div>
        </div>
      )}
      {/* Шалгасан */}
      {checkedAssignments.length > 0 && (
        <div>
          {/* <h3 className="text-lg font-semibold text-green-600 mb-4">
            Шалгасан ✅
          </h3> */}
          <div className="flex items-center space-x-4 my-6">
            <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
              {" "}
              Шалгасан{" "}
            </span>
            <div className="flex-1 border-t border-gray-300" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {checkedAssignments.map((a) => (
              <AssignmentItem
                key={a.id}
                id={a.id}
                title={a.title}
                submissions={a.totalSubmissions ?? 0}
                createdAt={a.createdAt}
                dueDate={a.dueDate || ""}
                isChecked={a?.isChecked}
                approvedSubmissions={a?.approvedSubmissions}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Assignment list
  // return (
  //   <>
  //     {sortedDates.map((date) => (
  //       <div key={date} className="mb-8">
  //         <div className="flex items-center space-x-4 my-6">
  //           <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
  //             {formatDate(date)}
  //           </span>
  //           <div className="flex-1 border-t border-gray-300" />
  //         </div>

  //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  //           {groupedAssignments[date].map((a) => (
  //             <AssignmentItem
  //               key={a.id}
  //               id={a.id}
  //               title={a.title}
  //               description={a.description || ""}
  //               submissions={a.totalSubmissions ?? 0}
  //               createdAt={a.createdAt}
  //               dueDate={a.dueDate || ""}
  //             />
  //           ))}
  //         </div>
  //       </div>
  //     ))}
  //   </>
  // );
};
