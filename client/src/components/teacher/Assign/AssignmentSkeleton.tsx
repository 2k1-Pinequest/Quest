"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const AssignmentSkeleton = () => {
  return (
    <div className="space-y-8">
      {Array(3).fill(0).map((_, dateIdx) => (
        <div key={dateIdx}>
          <div className="flex items-center space-x-4 my-6">
            <Skeleton className="h-4 w-32 rounded" />
            <div className="flex-1 border-t border-gray-300" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(3).fill(0).map((_, idx) => (
              <div key={idx} className="space-y-2 p-4 border rounded-xl bg-white">
                <Skeleton className="h-6 w-3/4 rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-5/6 rounded" />
                <Skeleton className="h-8 w-full rounded" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
