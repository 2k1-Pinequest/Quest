import { useRouter } from "next/navigation";

export const TeacherClassRoomHeader = () => {

  const router = useRouter();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button  onClick={() => router.push(`/`)}className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2" // ✅ зөв
              >
                <path d="m12 19-7-7 7-7"></path>
                <path d="M19 12H5"></path>
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              Teacher Dashboard
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};
