
"use client";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-8 h-8 border-4 border-gray-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
}
