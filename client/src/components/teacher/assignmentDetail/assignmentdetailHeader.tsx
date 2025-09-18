import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const TeacherAssignDetailHeader = () => {
  const router = useRouter();
  // Түр зуурын жишээ өгөгдөл
  const currentRoom = {
    homeworkTitle: "Математик 10А",
    code: "ABC123",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <div className="flex items-center justify-between mb-8">
        {/* Back button */}
        <button
          onClick={() => router.push("/teacherRoom")}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Буцах
        </button>

        {/* Title + room code */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold text-gray-800 leading-tight">
            {currentRoom.homeworkTitle}
          </h1>
          <p className="text-gray-600 mt-1">{currentRoom.code}</p>
        </div>

        <div></div>
      </div>
    </div>
  );
};
