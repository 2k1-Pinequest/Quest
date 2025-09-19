import { useState } from "react";
import { Users, BarChart3 } from "lucide-react";
import { OverviewCarts } from "./Stats/overviewCarts";
import { Distribution } from "./Stats/distribution";
import { SubmissionsAssignments } from "./Submissions/SubmissionAssignments";
import { Submission } from "@/types";

export const AssignmentTab = () => {
  const [selectedTab, setSelectedTab] = useState("submissions");

  const currentRoom: { submissions: Submission[] } = {
    submissions: [
      {
        id: "1",
        studentName: "John",
        roomCode: "AB123",
        content: "My assignment text",
        type: "text" as const,
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
        type: "upload" as const,
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
        type: "text" as const,
        aiScore: 78,
        aiFeedback: "Needs improvement",
        aiSuggestions: ["review"],
        submittedAt: new Date(),
      },
    ],
  };
  const title = "Тест гарчиг";
  const description = "Тест тайлбар";

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-[1200px] px-4 sm:px-6  bg-white rounded-2xl ">
        {/* Tabs */}
        <nav className="flex bg-gray-100 rounded-lg  ">
          <button
            onClick={() => setSelectedTab("submissions")}
            className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
              selectedTab === "submissions"
                ? "bg-white shadow text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Гэрийн Даалгавар ({currentRoom.submissions.length})
          </button>

          <button
            onClick={() => setSelectedTab("stats")}
            className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
              selectedTab === "stats"
                ? "bg-white shadow text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Тоон үзүүлэлт
          </button>
        </nav>

        {/* Content */}
        <div className="mt-4 p-6">
          {selectedTab === "submissions" ? (
            <SubmissionsAssignments title={title} description={description} />
          ) : (
            <div className="flex flex-col gap-6">
              <OverviewCarts submissions={currentRoom?.submissions} />
              <Distribution submissions={currentRoom?.submissions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
