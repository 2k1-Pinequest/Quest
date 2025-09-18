import { useState } from "react";
import { Users, BarChart3 } from "lucide-react";
import { OverviewCarts } from "./Stats/overviewCarts";
import { Distribution } from "./Stats/distribution";
import { SubmissionsAssignments } from "./Submissions/SubmissionAssignments";
import { Submission } from "@/types";

export const AssignmentTab = () => {
  // Түр зуурын state
  const [selectedTab, setSelectedTab] = useState("submissions");

  // Dummy өгөгдөл (дараа нь props/state-оор солино)
  const currentRoom: { submissions: Submission[] } = {
    submissions: [
      {
        id: "1",
        studentName: "John",
        roomCode: "AB123",
        content: "My assignment text",
        type: "text" as const, // ← literal string
        aiScore: 85,
        aiFeedback: "Good job",
        aiSuggestions: ["approve"],
        submittedAt: new Date(),
      },
      {
        id: "2",
        studentName: "Sara",
        roomCode: "AB123",
        content: "My assignment file",
        type: "upload" as const, // ← literal string
        aiScore: 92,
        aiFeedback: "Excellent",
        aiSuggestions: ["approve"],
        submittedAt: new Date(),
      },
      {
        id: "3",
        studentName: "Boldoo",
        roomCode: "AB123",
        content: "Some text content",
        type: "text" as const, // ← literal string
        aiScore: 78,
        aiFeedback: "Needs improvement",
        aiSuggestions: ["review"],
        submittedAt: new Date(),
      },
    ],
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 w-500">
        <nav className="flex space-x-1 bg-gray-100 rounded-lg p-1 ">
          {/* Submissions tab */}
          <button
            onClick={() => setSelectedTab("submissions")}
            className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
              selectedTab === "submissions"
                ? "bg-white shadow-sm text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Гэрийн Даалгавар ({currentRoom.submissions.length})
          </button>

          {/* Stats tab */}
          <button
            onClick={() => setSelectedTab("stats")}
            className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
              selectedTab === "stats"
                ? "bg-white shadow-sm text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Statistics
          </button>
        </nav>

        {/* Dummy content */}
        <div className="mt-4 p-4  bg-white">
          {selectedTab === "submissions" ? (
            // <ul className="list-disc pl-5 space-y-1 text-gray-700">
            //   {currentRoom.submissions.map((s) => (
            //     <li key={s.id}>{s.student}</li>
            //   ))}
            // </ul>
            <SubmissionsAssignments />
          ) : (
            <div className="flex flex-col gap-6 ">
              <OverviewCarts submissions={currentRoom?.submissions} />
              <Distribution submissions={currentRoom?.submissions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
