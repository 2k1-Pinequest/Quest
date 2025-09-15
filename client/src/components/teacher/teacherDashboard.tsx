"use client";

import { BookOpen } from "lucide-react";
import { TeacherClassRoomHeader } from "./teacherClassroomHeader";
import { TeacherAssignmentForm } from "./teacheAssignmentForm";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { mn } from "date-fns/locale";
import { AssignmentItem } from "./assignmentItem";

export const TeacherClassRooms = () => {
  const router = useRouter();

  // Зөвхөн 10А ангийн (Нийгмийн багшийн) өдөр өдрөөр даалгавар
  const classAssignments = [
    {
      date: "2025-09-14",
      assignments: [
        {
          id: 1,
          title: "Нийгэм",
          description: "Хүн ба нийгмийн тухай уншлага: хуудас 12–18",
          submissions: 5,
        },
        {
          id: 2,
          title: "Нийгэм",
          description: "Монгол Улсын Үндсэн хуулийн талаар эсээ бич",
          submissions: 0,
        },
      ],
    },
    {
      date: "2025-09-15",
      assignments: [
        {
          id: 3,
          title: "Нийгэм",
          description: "Хүн ба байгаль орчны тухай уншлага",
          submissions: 2,
        },
      ],
    },
  ];

  return (
    <div className="">
      <TeacherClassRoomHeader />
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* angiud songogoh navbar */}
          <div className="lg:col-span-1">
  <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col h-full">
    {/* Header */}
    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-users mr-2"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
      My Classrooms
    </h3>

    {/* Class list */}
    <div className="space-y-2 flex-1">
      <button className="w-full text-left p-3 rounded-xl transition-colors hover:bg-gray-50">
        <div className="font-semibold">10Aaaaa</div>
        <div className="text-sm text-gray-500">VS29R5</div>
      </button>
    </div>

    {/* Add class button */}
    <button className="mt-4 flex items-center justify-center gap-2 text-blue-600 font-medium py-2 px-3 rounded-xl border border-blue-300 hover:bg-blue-50 transition">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-plus"
      >
        <path d="M12 5v14"></path>
        <path d="M5 12h14"></path>
      </svg>
      Анги нэмэх
    </button>
  </div>
</div>


          {/* 10А ангийн өдөр өдрөөр даалгавар */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">10A</h2>
                  <p className="text-gray-600">
                    Ангийн код
                    <span className="font-mono font-semibold"> VS29R5</span>
                  </p>
                </div>
                <TeacherAssignmentForm />
              </div>
            </div>

            {/* өдөр өдрөөр харуулах */}
            {classAssignments.map((dayBlock) => (
              <div key={dayBlock.date} className="space-y-4">
                
                {dayBlock.assignments.map((a) => (
                  <AssignmentItem
                    key={a.id}
                    id={a.id}
                    title={a.title}
                    description={a.description}
                    submissions={a.submissions}
                  />
                ))}
              </div>
            ))}

          </div>
        </div>
      </main>
    </div>
  );
};
