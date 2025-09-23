"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { TeacherAssignmentForm } from "./teacheAssignmentForm";
import { Assignment } from "@/types";
import { ClassroomList } from "./ClassroomList";
import { AssignmentList } from "./AssignmentList";

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
  const [classroomsLoading, setClassroomsLoading] = useState(false);
  const [assignmentsLoading, setAssignmentsLoading] = useState(false);

  useEffect(() => {
    if (!teacherId) return;
    setClassroomsLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/room/${teacherId}`)
      .then((res) => res.json())
      .then((data: Classroom[]) => {
        setClassrooms(data);
        setTimeout(() => {
          setClassroomsLoading(false);
        }, 500);
      })
      .catch((err) => {
        console.error(err);
        setClassroomsLoading(false);
      });
  }, [teacherId]);

  useEffect(() => {
    const savedId = localStorage.getItem("activeClassroomId");
    if (savedId) setActiveClassroomId(Number(savedId));
  }, []);

  const addClassroom = (roomName: string) => {
    if (!teacherId || !roomName.trim()) return;
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/room/${teacherId}`, {
        roomName,
      })
      .then((res) => res.data)
      .then((data) => {
        if (data.room) setClassrooms((prev) => [...prev, data.room]);
      })
      .catch((err) => console.error(err));
  };

  const deleteClassroom = async (roomId: number, roomName: string) => {
    if (!window.confirm(`Та "${roomName}" ангийг устгахдаа итгэлтэй байна уу?`))
      return;
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

  // useEffect(() => {
  //   if (!activeClassroomId) return;
  //   setAssignmentsLoading(true);

  //   axios
  //     .get(`${process.env.NEXT_PUBLIC_API_URL}/room/${activeClassroomId}/assignments`)
  //     .then((res) => setAssignments(res.data))
  //     .catch((err) => {
  //       console.error(err);
  //       setAssignments([]);
  //     })
  //     .finally(() => {
  //       setTimeout(() => setAssignmentsLoading(false), 500);
  //     });
  // }, [activeClassroomId]);

  useEffect(() => {
    if (!activeClassroomId) return;
    setAssignmentsLoading(true);

    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/teacher/isChecked/${activeClassroomId}`
      )
      .then((res) => {
        console.log("resssssssssyayay", res);
        setAssignments(res.data);
      })
      .catch((err) => {
        console.error(err);
        setAssignments([]);
      })
      .finally(() => {
        setTimeout(() => setAssignmentsLoading(false), 500);
      });
  }, [activeClassroomId]);

  const activeClassroom = classrooms.find((c) => c.id === activeClassroomId);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[1200px] px-4 sm:px-6 bg-white rounded-2xl">
        <main className="px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
          <div className="flex flex-col md:flex-row gap-10 w-full">
            {/* Classroom List */}
            <ClassroomList
              classrooms={classrooms}
              activeClassroomId={activeClassroomId}
              setActiveClassroomId={setActiveClassroomId}
              deleteClassroom={deleteClassroom}
              addClassroom={addClassroom}
              loading={classroomsLoading}
            />

            {/* Assignment Section */}
            <div className="flex-1 min-h-[400px]">
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
                <AssignmentList
                  loading={assignmentsLoading}
                  assignments={assignments}
                  activeClassroomId={activeClassroomId}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
