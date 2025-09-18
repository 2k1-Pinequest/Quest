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

        <div></div>
      </div>
    </div>
  );
};
