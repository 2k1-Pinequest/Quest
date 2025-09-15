import { useState } from "react";
import { Users, BarChart3 } from "lucide-react";
import { OverviewCarts } from "./overviewCarts";
import { Distribution } from "./distribution";

export const AssignmentTab = () => {
  // Түр зуурын state
  const [selectedTab, setSelectedTab] = useState("submissions");

  // Dummy өгөгдөл (дараа нь props/state-оор солино)
  const currentRoom = {
    submissions: [
      { id: 1, student: "John" },
      { id: 2, student: "Sara" },
      { id: 3, student: "Boldoo" },
    ],
  };

  return (
    <div className="mb-8">
      <nav className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {/* Submissions tab */}
        <button
          onClick={() => setSelectedTab("submissions")}
          className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
            selectedTab === "submissions"
              ? "bg-white shadow-sm text-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <Users className="h-4 w-4 mr-2" />
          Submissions ({currentRoom.submissions.length})
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
      <div className="mt-4 p-4 border rounded-lg bg-white">
        {selectedTab === "submissions" ? (
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {currentRoom.submissions.map((s) => (
              <li key={s.id}>{s.student}</li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col gap-6 p-30">
            <OverviewCarts submissions={currentRoom?.submissions} />
            <Distribution submissions={currentRoom?.submissions} />
          </div>
        )}
      </div>
    </div>
  );
};
