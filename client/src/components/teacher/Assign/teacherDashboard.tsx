"use client";

import { BookOpen, Plus, Users } from "lucide-react";
import { TeacherClassRoomHeader } from "./teacherClassroomHeader";
import { TeacherAssignmentForm } from "./teacheAssignmentForm";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { mn } from "date-fns/locale";
import { AssignmentItem } from "./assignmentItem";
import { Button } from "../../ui/button";

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

        {
          id: 3,
          title: "Нийгэм",
          description: "Монгол Улсын Үндсэн хуулийн талаар эсээ бич",
          submissions: 0,
        },
      ],
    },
  ];

  return (
    <div className="">
      <TeacherClassRoomHeader />
      <main className="px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
        <div className="flex gap-10">
          {/* angiud songogoh navbar */}
          <div className="lg:col-span-1">
            <div className="border w-[233px] p-6 rounded-xl flex flex-col">
              {/* Header */}
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  My Classrooms
                </h3>
                <Button
                  variant="secondary"
                  className="bg-blue-500 text-white hover:text-black"
                >
                  <Plus />
                </Button>
              </div>

              <div className="border mb-5"></div>

              {/* Class list */}
              <div className="flex flex-col gap-2">
                <Button
                  variant="secondary"
                  className="bg-blue-500 text-white hover:text-black"
                >
                  <div className="font-semibold">9A Анги</div>
                </Button>
                <Button
                  variant="secondary"
                  className="bg-blue-500 text-white hover:text-black"
                >
                  <div className="font-semibold">9Б Анги</div>
                </Button>
                <Button
                  variant="secondary"
                  className="bg-blue-500 text-white hover:text-black"
                >
                  <div className="font-semibold">8A Анги</div>
                </Button>
                <Button
                  variant="secondary"
                  className="bg-blue-500 text-white hover:text-black"
                >
                  <div className="font-semibold">6A Анги</div>
                </Button>
              </div>

              {/* Add class button */}
            </div>
          </div>

          {/* 10А ангийн өдөр өдрөөр даалгавар */}
          <div className="lg:col-span-3 ">
            <div className="border rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">10A Анги</h2>
                  <p className="text-gray-600">
                    Ангийн код
                    <span className="font-mono font-semibold">VS29R5</span>
                  </p>
                </div>
                <TeacherAssignmentForm />
              </div>
              <div className="border mb-5"></div>
              {classAssignments.map((dayBlock) => (
                <div
                  key={dayBlock.date}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-4"
                >
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

            {/* өдөр өдрөөр харуулах */}
          </div>
        </div>
      </main>
    </div>
  );
};
