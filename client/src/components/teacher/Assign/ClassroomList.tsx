"use client";
import { AddClass } from "./addRoom";
import { ClassroomSkeleton } from "./ClassroomSkeleton";

interface Classroom {
  id: number;
  roomName: string;
  code: string;
}

interface Props {
  classrooms: Classroom[];
  activeClassroomId: number | null;
  setActiveClassroomId: (id: number) => void;
  deleteClassroom: (id: number, name: string) => void;
  addClassroom: (roomName: string) => void;
  loading?: boolean; 
}

export const ClassroomList = ({
  classrooms,
  activeClassroomId,
  setActiveClassroomId,
  addClassroom,
  loading = false,
}: Props) => {
  if (loading) return <ClassroomSkeleton />; 

  return (
    <div className="w-[233px] flex-shrink-0">
      <div className="border p-6 rounded-xl flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Миний ангиуд</h3>
          <AddClass addClassroom={addClassroom} />
        </div>

        <div className="border mb-5"></div>

        <div className="flex flex-col gap-2">
          {classrooms.map((c) => (
            <div
              key={c.id}
              onClick={() => {
                setActiveClassroomId(c.id);
                localStorage.setItem("activeClassroomId", String(c.id));
              }}
              className={`group flex justify-between items-center border rounded-lg px-3 py-2 cursor-pointer transition ${
                activeClassroomId === c.id
                  ? "bg-blue-700"
                  : "bg-blue-400 hover:bg-blue-600"
              }`}
            >
              <span className="font-semibold text-white">{c.roomName} анги</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
