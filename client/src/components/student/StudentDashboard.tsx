"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, X } from "lucide-react";
import Student from "./studentHomeWork";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import AssignmentCard from "./AssignmentCard";
import { useRouter } from "next/navigation";
import { Assignment } from "@/types";

export default function StudentDashboard() {
  const router = useRouter();

  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(false);
  const [studentName, setStudentName] = useState<string>("");
  const [room, setRoom] = useState<{
    id: number;
    roomName: string;
    code: string;
  } | null>(null);
  useEffect(() => {
    localStorage.setItem("studentId", "3");
  }, []);
  useEffect(() => {
    const fetchRoomInfo = async () => {
      const studentId = localStorage.getItem("studentId");
      console.log("Student ID from localStorage:", studentId); // debug
      if (!studentId) return;

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/student/room/${studentId}`
        );
        console.log("Room API response:", res.data);
        setStudentName(res.data.studentName);
        setRoom({
          id: res.data.room.id,
          roomName: res.data.room.title,
          code: res.data.room.code,
        });
      } catch (err) {
        console.error("Failed to fetch student room info:", err);
      }
    };

    fetchRoomInfo();
  }, []);

  useEffect(() => {
    if (!room?.id) {
      console.log("Room not loaded yet, skipping assignments fetch"); // debug
      return;
    }

    const fetchAssignments = async () => {
      setLoading(true);
      try {
        console.log("Fetching assignments for room:", room.id); // debug
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/student/assignments/${room.id}`
        );
        console.log("Assignments response:", res.data); // debug
        setAssignments(res.data);
      } catch (err) {
        console.error("Failed to fetch assignments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [room]);

  const handleGoBack = () => {
    router.push("/");
  };

  const groupedAssignments = assignments.reduce(
    (acc: Record<string, Assignment[]>, assignment) => {
      const dateObj = new Date(assignment.createdAt);
      const dateKey = `${dateObj.getFullYear()}-${
        dateObj.getMonth() + 1
      }-${dateObj.getDate()}`;

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
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("mn-MN", options);
  };

  return (
    <div className="flex flex-col min-h-screen px-4 md:px-8 py-8 bg-gray-50">
      <div className="w-full max-w-[1000px] mx-auto flex flex-col">
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleGoBack}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-200 transition"
            >
              <ChevronLeft size={28} />
            </button>
            <div>
              <h1 className="text-3xl">
                {studentName} - {room?.roomName}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Ангийн код: {room?.code || "---"}
              </p>
            </div>
          </div>
        </header>

        <main className="space-y-8">
          <h3 className="text-2xl">Ирсэн даалгавар</h3>

          {loading ? (
            <p className="text-gray-500">Дээж даалгавруудыг ачаалж байна...</p>
          ) : assignments.length === 0 ? (
            <p className="text-gray-500">Ямар ч даалгавар ирээгүй байна.</p>
          ) : (
            sortedDates.map((date) => (
              <div key={date} className="space-y-4">
                <div className="flex items-center space-x-4 my-2">
                  <p className="text-sm text-gray-500 whitespace-nowrap">
                    {formatDate(date)}
                  </p>
                  <div className="flex-1 border-t border-gray-300" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {groupedAssignments[date].map((assignment) => (
                    <AssignmentCard
                      key={assignment.id}
                      assignment={assignment}
                      onSelect={setSelectedAssignment}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </main>
      </div>

      <AnimatePresence>
        {selectedAssignment && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl p-8 relative max-h-[90vh] flex flex-col"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <button
                onClick={() => setSelectedAssignment(null)}
                className="flex items-center absolute top-3 right-3 z-50 p-2 rounded-full text-blue-600 hover:text-blue-700"
              >
                <X className="h-4 w-4 mr-1" />
              </button>

              <div className="overflow-y-auto scrollbar-none">
                <Student assignment={selectedAssignment} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
