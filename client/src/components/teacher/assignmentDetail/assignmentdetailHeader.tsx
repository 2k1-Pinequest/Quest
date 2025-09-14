import { ArrowLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export const TeacherAssignDetailHeader = () => {
  const router = useRouter();
  // Түр зуурын жишээ өгөгдөл
  const currentRoom = {
    homeworkTitle: "Math Homework - Fractions",
    code: "ABC123",
  };

  return (
    <div className="max-w-7xl mx-auto">
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
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {currentRoom.homeworkTitle}
          </h1>
          <p className="text-gray-600">Room Code: {currentRoom.code}</p>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => console.log("Create new room")}
            className="flex items-center bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-teal-700 transition-all duration-200 text-sm"
          >
            <Plus className="h-4 w-4 mr-1" />
            New Room
          </button>

          <button
            onClick={() => console.log("Exit")}
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200 text-sm"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};
