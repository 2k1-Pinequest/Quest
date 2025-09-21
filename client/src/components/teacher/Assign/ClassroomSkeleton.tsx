"use client";
import { Skeleton } from "@/components/ui/skeleton";

export const ClassroomSkeleton = () => {
  return (
    <div className="w-[233px] flex-shrink-0">
      <div className="border p-6 rounded-xl flex flex-col gap-2">
        <Skeleton className="h-6 w-3/4 rounded mb-4" /> 
        <div className="flex flex-col gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1 border rounded-lg bg-white">
              <Skeleton className="h-8 w-full rounded" /> 
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
