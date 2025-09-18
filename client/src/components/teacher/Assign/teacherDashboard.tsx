"use client";

import { BookOpen, Plus, Trash2, Users } from "lucide-react";
import { TeacherClassRoomHeader } from "./teacherClassroomHeader";
import { useRouter } from "next/navigation";
import { AssignmentItem } from "./assignmentItem";
import { Button } from "../../ui/button";
import { useEffect, useState } from "react";
import { AddClass } from "./addDeleteRoom";
import axios from "axios";
import { TeacherAssignmentForm } from "./teacheAssignmentForm";

// {
//     "id": 6,
//     "roomId": 1,
//     "title": "Математие язгуур",
//     "description": "бодоорой",
//     "textContent": "Номны 23-р хуудасыг бод",
//     "dueDate": "2025-09-17T16:00:00.000Z",
//     "createdAt": "2025-09-16T12:47:38.529Z",
//     "updatedAt": "2025-09-16T12:47:38.529Z"
// }

interface Assignment {
  id: number;
  roomId: string;
  title: string;
  description: string;
  textContent: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

const room = {
  id: "mockRoom123",
  roomCode: "7MGL3M",
  title: "9a ",
};

export const TeacherClassRooms = ({ teacherId }: { teacherId: number }) => {
  const router = useRouter();

  const [classrooms, setClassrooms] = useState<
    { id: number; roomName: string; code: string }[]
  >([]);

  const [activeClassroomId, setActiveClassroomId] = useState<number | null>(
    null
  );

  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const [newClassInput, setNewClassInput] = useState("");
  const [showInput, setShowInput] = useState(false);

  const [loading, setLoading] = useState(false);

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

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/room/${teacherId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response not ok");
        return res.json();
      })
      .then((data) => setClassrooms(data))
      .catch((err) => console.error(err));
  }, [teacherId]);

  const addClassroom = (roomName: string) => {
    if (!teacherId) {
      console.error("teacherId is undefined");
      return;
    }

    console.log("roomName", roomName);

    if (!roomName.trim()) return;

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/room/${teacherId}`, {
        roomName: roomName.trim(),
      })
      .then((res) => {
        console.log("RESPONSE CREATE ROOM", res.data);
        return res.data; // JSON болгож буцааж байна
      })
      .then((data) => {
        if (data.room) {
          setClassrooms((prev) => [...prev, data.room]); // өмнөх state-д нэмж өгнө
          setNewClassInput("");
          setShowInput(false);
        }
      })
      .catch((err) => console.error(err));
  };

  const deleteClassroom = async (roomId: number, roomName: string) => {
    // Баталгаажуулалт
    const confirmDelete = window.confirm(
      `Та "${roomName}" анги-г устгахыг хүсэж байна уу?`
    );
    if (!confirmDelete) return; // Хэрэглэгч цуцлав

    try {
      // Backend рүү DELETE request
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/room/${roomId}`);

      // State update
      setClassrooms((prev) => prev.filter((c) => c.id !== roomId));
    } catch (err) {
      console.error("Failed to delete classroom:", err);
    }
  };

  // const handleAddClassroom = () => {};

  // Зөвхөн 10А ангийн (Нийгмийн багшийн) өдөр өдрөөр даалгавар

  // const classAssignments = [
  //   {
  //     date: "2025-09-14",
  //     assignments: [
  //       {
  //         id: 1,
  //         title: "Нийгэм",
  //         description: "Хүн ба нийгмийн тухай уншлага: хуудас 12–18",
  //         submissions: 5,
  //       },

  //       {
  //         id: 2,
  //         title: "Нийгэм",
  //         description: "Монгол Улсын Үндсэн хуулийн талаар эсээ бич",
  //         submissions: 0,
  //       },

  //       {
  //         id: 3,
  //         title: "Нийгэм",
  //         description: "Монгол Улсын Үндсэн хуулийн талаар эсээ бич",
  //         submissions: 0,
  //       },
  //     ],
  //   },
  // ];

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/student/assignments/1`
        );
        setAssignments(res.data);
        console.log("assignments", assignments);
      } catch (err) {
        console.error("Failed to fetch assignments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [room.id]);

  console.log("assignments", assignments);
  const activeClassroom = classrooms.find((c) => c.id === activeClassroomId);

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
                  Миний ангиуд
                </h3>
                <AddClass addClassroom={addClassroom} />
              </div>

              <div className="border mb-5"></div>

              {/* Class list */}
              <div className="flex flex-col gap-2">
                {classrooms.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setActiveClassroomId(c.id)}
                    className={`group flex justify-between items-center border rounded-lg px-3 py-2 cursor-pointer transition
    ${
      activeClassroomId === c.id
        ? "bg-blue-700" // сонгогдсон үед
        : "bg-blue-500 hover:bg-blue-600"
    }  // энгийн үед
  `}
                  >
                    <span className="font-semibold text-white">
                      {c.roomName} анги
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // delete дээр дарахад сонголт өөрчлөгдөхгүй
                        deleteClassroom(c.id, c.roomName);
                      }}
                      className="p-1 rounded-full text-gray-200 opacity-0 group-hover:opacity-100 hover:text-red-400 hover:scale-110 transition-all duration-200"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add class button */}
            </div>
          </div>

          {/* 10А ангийн өдөр өдрөөр даалгавар */}
          <div className="lg:col-span-3 ">
            <div className="border rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {activeClassroom
                      ? `${activeClassroom.roomName} Анги`
                      : "Анги сонгоно уу"}
                  </h2>
                  <p className="text-gray-600">
                    Ангийн код{" "}
                    <span className="font-mono font-semibold">
                      {activeClassroom ? activeClassroom.code : "---"}
                    </span>
                  </p>
                </div>

                <TeacherAssignmentForm roomId={1} teacherId={1} />
              </div>
              <div className="mb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {assignments.map((dayBlock) => (
                  <div key={dayBlock.createdAt}>
                    <AssignmentItem
                      key={dayBlock.createdAt}
                      id={dayBlock.id}
                      title={dayBlock.title}
                      description={dayBlock.description}
                      submissions={6}
                      createdAt={dayBlock.createdAt}
                      dueDate={dayBlock.dueDate}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
