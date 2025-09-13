// import React, { useState } from "react";
import { BookOpen, Upload, LogOut, ChevronLeft } from "lucide-react";

interface Assignment {
  id: string;
  roomId: string;
  title: string;
  instruction: string;
  createdAt: string;
}

export default function StudentDashboard() {
  //   const [selectedAssignment, setSelectedAssignment] =
  //     useState<Assignment | null>(null);

  const student = { id: "student_1", name: "Student Demo" };
  const room = {
    id: "mockRoom123",
    roomCode: "7MGL3M",
    title: "Classroom Demo",
  };
  const assignments: Assignment[] = [
    {
      id: "assign_1",
      roomId: "mockRoom123",
      title: "Science Fair Project",
      instruction:
        "Write a proposal for your science fair project, including your hypothesis, materials, and procedure.",
      createdAt: "10/26/2023",
    },
    {
      id: "assign_2",
      roomId: "mockRoom123",
      title: "History Essay",
      instruction:
        "Write a 500-word essay on the causes and effects of World War I.",
      createdAt: "10/25/2023",
    },
  ];

  //   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();

  //     if (!selectedAssignment) {
  //       console.error("No assignment selected for submission.");
  //       return;
  //     }

  //     setTimeout(() => {
  //       setSubmitSuccess(true);
  //       setTimeout(() => {
  //         setSelectedAssignment(null);
  //         setSubmitSuccess(false);
  //       }, 2000);
  //     }, 1500);
  //   };

  const handleGoBack = () => {
    console.log("Navigating back to rooms...");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900 font-sans p-4 md:p-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleGoBack}
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            title="Back to Rooms"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
              {room.title || "Classroom Dashboard"}
            </h1>
            <p className="text-sm font-semibold text-gray-500 font-mono">
              Room Code: {room.roomCode || "N/A"}
            </p>
          </div>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-full shadow transition-colors flex items-center space-x-2">
          <LogOut size={18} />
          <span>Exit</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Student Info and Stats */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Welcome, {student.name}!
              </h2>
              <p className="text-gray-600">
                Room: <span className="font-semibold">{room.title}</span> -{" "}
                {room.roomCode}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Assignments Available</div>
              <div className="text-2xl font-bold text-green-600">
                {assignments.length}
              </div>
            </div>
          </div>
        </div>

        {/* Assignments Grid */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Your Assignments
          </h3>

          {assignments.length === 0 ? (
            <div className="text-center py-12 bg-white shadow-lg rounded-2xl">
              <BookOpen size={48} className="text-gray-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-700 mb-2">
                No Assignments Yet
              </h4>
              <p className="text-gray-600">
                Check back later for new assignments from your teacher
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <BookOpen size={20} className="text-blue-500" />
                      <h4 className="font-semibold text-gray-900">
                        {assignment.title}
                      </h4>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {assignment.instruction}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      Created: {assignment.createdAt}
                    </div>
                    <button
                      //   onClick={() => setSelectedAssignment(assignment)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-1"
                    >
                      <Upload size={16} />
                      <span>Submit</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Otgoogiin heseg submit heseg */}
    </div>
  );
}
