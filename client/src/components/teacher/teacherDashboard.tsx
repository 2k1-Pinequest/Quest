"use client";


import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { TeacherClassRoomHeader } from "./Assign/teacherClassroomHeader";
import { TeacherAssignmentForm } from "./Assign/teacheAssignmentForm";
import { AssignmentItem } from "./Assign/assignmentItem";

type Props = {
  teacherId: number;
};

export const TeacherClassRooms = ({ teacherId }: Props) => {
  const router = useRouter();
  const [classrooms, setClassrooms] = useState<
    { id: number; roomName: string; code: string }[]
  >([]);

  const [newClassInput, setNewClassInput] = useState("");
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("classrooms");
    if (saved) {
      setClassrooms(JSON.parse(saved));
    } else {
      setClassrooms([{ id: 1, roomName: "10A", code: "VS29R5" }]);
    }
  }, []);

  useEffect(() => {
    if (!teacherId) return;

    fetch(`http://localhost:4200/room/${teacherId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response not ok");
        return res.json();
      })
      .then((data) => setClassrooms(data))
      .catch((err) => console.error(err));
  }, [teacherId]);

  const addClassroom = () => {
    if (!teacherId) {
      console.error("teacherId is undefined");
      return;
    }

    if (!newClassInput.trim()) return;

    fetch(`http://localhost:4200/room/${teacherId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomName: newClassInput.trim() }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.room) {
          setClassrooms((prev) => [...prev, data.room]); // өмнөх state-д нэмж өгнө
          setNewClassInput("");
          setShowInput(false);
        }
      })
      .catch((err) => console.error(err));
  };

  const deleteClassroom = (roomId: number) => {
    fetch(`http://localhost:4200/room/${roomId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setClassrooms(classrooms.filter((c) => c.id !== roomId));
      })
      .catch((err) => console.error(err));
  };

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
  ];

  return (
    <div>
      <TeacherClassRoomHeader />
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Classroom navbar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col h-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
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

          {/* Assignments хэсэг */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">10A</h2>
                  <p className="text-gray-600">
                    Ангийн код{" "}
                    <span className="font-mono font-semibold">VS29R5</span>
                  </p>
                </div>
                <TeacherAssignmentForm teacherId={1} roomId={1} />
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
