"use client";

import { CirclePlus, Trash2 } from "lucide-react";
import { TeacherClassRoomHeader } from "./teacherClassroomHeader";
import { AssignmentItem } from "./assignmentItem";
import { useEffect, useState } from "react";
import { AddClass } from "./addDeleteRoom";
import axios from "axios";
import { TeacherAssignmentForm } from "./teacheAssignmentForm";

interface Assignment {
  id: number;
  roomId: number;
  title: string;
  description: string | null;
  textContent: string | null;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  _count: {
    submissions: number;
  };
}

interface Classroom {
  id: number;
  roomName: string;
  code: string;
}

export const TeacherClassRooms = ({ teacherId }: { teacherId: number }) => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [activeClassroomId, setActiveClassroomId] = useState<number | null>(
    null
  );
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!teacherId) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/room/${teacherId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response not ok");
        return res.json();
      })
      .then((data: Classroom[]) => {
        setClassrooms(data);
      })
      .catch((err) => console.error(err));
  }, [teacherId]);

  const addClassroom = (roomName: string) => {
    if (!teacherId || !roomName.trim()) return;

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/room/${teacherId}`, {
        roomName: roomName.trim(),
      })
      .then((res) => res.data)
      .then((data) => {
        if (data.room) setClassrooms((prev) => [...prev, data.room]);
      })
      .catch((err) => console.error(err));
  };

  const deleteClassroom = async (roomId: number, roomName: string) => {
    const confirmDelete = window.confirm(
      `Та "${roomName}" ангийг устгахдаа итгэлтэй байна уу?`
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/room/${roomId}`);
      setClassrooms((prev) => prev.filter((c) => c.id !== roomId));
      if (activeClassroomId === roomId) {
        setAssignments([]);
        setActiveClassroomId(null);
      }
    } catch (err) {
      console.error("Failed to delete classroom:", err);
    }
  };

  useEffect(() => {
    if (!activeClassroomId) return;

    const fetchAssignments = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/room/${activeClassroomId}/assignments`
        );
        setAssignments(res.data);
      } catch (err) {
        console.error("Failed to fetch assignments:", err);
        setAssignments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [activeClassroomId]);

  const activeClassroom = classrooms.find((c) => c.id === activeClassroomId);

  const groupedAssignments = assignments.reduce(
    (acc: Record<string, Assignment[]>, assignment) => {
      const dateKey = new Date(assignment.createdAt)
        .toISOString()
        .split("T")[0]; // YYYY-MM-DD
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(assignment);
      return acc;
    },
    {}
  );

  const sortedDates = Object.keys(groupedAssignments).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("mn-MN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      <TeacherClassRoomHeader />
      <main className="px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
        <div className="flex gap-10 w-full">
          <div className="w-[233px] flex-shrink-0">
            <div className="border p-6 rounded-xl flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Миний ангиуд
                </h3>
                <AddClass addClassroom={addClassroom} />
              </div>

              <div className="border mb-5"></div>

              <div className="flex flex-col gap-2">
                {classrooms.map((c) => (
                  <div
                    key={c.id}

                    onClick={() => setActiveClassroomId(c.id)}
                    className={`group flex justify-between items-center border rounded-lg px-3 py-2 cursor-pointer transition ${

                      activeClassroomId === c.id
                        ? "bg-blue-700"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    <span className="font-semibold text-white">
                      {c.roomName} анги
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteClassroom(c.id, c.roomName);
                      }}
                      className="p-1 rounded-full text-gray-200 opacity-0 group-hover:opacity-100 hover:text-red-400 hover:scale-110 transition-all duration-200"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-[400px]">
            <div className="border rounded-2xl p-6 h-full flex flex-col">
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

                <TeacherAssignmentForm
                  roomId={activeClassroom ? activeClassroom.id : 0}
                  teacherId={teacherId}
                  disabled={!activeClassroom}
                  onAssignmentCreated={(newAssignment) => {
                    if (newAssignment.roomId === activeClassroomId) {
                      setAssignments((prev) => [newAssignment, ...prev]);
                    }
                  }}
                />
              </div>

              <div className="flex-1 min-h-[200px] overflow-y-auto">
                {loading ? (
                  <p>Даалгавруудыг ачаалж байна...</p>
                ) : assignments.length > 0 ? (
                  sortedDates.map((date) => (
                    <div key={date} className="mb-8">
                      <div className="flex items-center space-x-4 my-6">
                        <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                          {formatDate(date)}
                        </span>
                        <div className="flex-1 border-t border-gray-300" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {groupedAssignments[date].map((a) => (
                          <AssignmentItem
                            key={a.id}
                            id={a.id}
                            title={a.title}
                            description={a.description || ""}
                            submissions={a._count?.submissions ?? 0}
                            createdAt={a.createdAt}
                            dueDate={a.dueDate || ""}
                          />
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 py-10">
                    {!activeClassroomId ? (
                      <>
                        <p className="text-lg font-medium">
                          Эхлээд ангиа сонгоно уу 
                        </p>
                      </>
                    ) : (
                      <>
                        <CirclePlus size={48} className="mb-4 text-gray-400" />
                        <p className="text-lg font-medium">
                          Одоогоор даалгавар байхгүй байна
                        </p>
                        <p className="text-sm">
                          Шинэ даалгавар үүсгэх товчийг дарж эхлүүлээрэй
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
