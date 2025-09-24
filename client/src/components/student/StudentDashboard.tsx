"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle,
  ChevronLeft,
  ClipboardList,
  Hourglass,
  X,
} from "lucide-react";
import Student from "./studentHomeWork";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import AssignmentCard from "./AssignmentCard";
import { useRouter } from "next/navigation";
import { Assignment } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

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

  // useEffect(() => {
  //   localStorage.setItem("studentId", "2");
  // }, []);

  useEffect(() => {
    const fetchRoomInfo = async () => {
      const studentId = localStorage.getItem("studentId");
      if (!studentId) return;

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/student/room/${studentId}`
        );
        setStudentName(res.data.studentName);
        setRoom({
          id: res.data.room.id,
          roomName: res.data.room.title,
          code: res.data.room.code,
        });
        console.log("Room and Student Info:", res.data);
      } catch (err) {
        console.error("Failed to fetch student room info:", err);
      }
    };

    fetchRoomInfo();
  }, []);

  useEffect(() => {
    if (!room?.id) return;

    const fetchAssignments = async () => {
      setLoading(true);
      try {
        const studentId = localStorage.getItem("studentId");
        if (!studentId) {
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/student/assignments/${room.id}?studentId=${studentId}`
        );
        setAssignments(res.data);
        console.log("Fetched Assignments:", res.data);
      } catch (err) {
        console.error("Failed to fetch assignments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [room]);

  const handleGoBack = () => {
    router.push("/studentJoinRoom");
  };

  const newAssignments = assignments.filter((a) => !a.studentSubmission);

  const pendingAssignments = assignments.filter(
    (a) => a.studentSubmission && a.studentSubmission.status !== "APPROVED"
  );

  const completedAssignments = assignments.filter(
    (a) =>
      a.studentSubmission?.status === "APPROVED" &&
      a.studentSubmission.score !== null
  );

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
              <h1 className="text-3xl font-normal text-gray-800">
                {studentName || <Skeleton className="h-8 w-64 rounded" />}
                {!studentName && room?.roomName && (
                  <Skeleton className="h-6 w-32 mt-2 rounded" />
                )}
              </h1>
              <div className="text-sm text-gray-500 mt-1">
                Ангийн код:{" "}
                {room?.code || (
                  <Skeleton className="h-4 w-20 rounded inline-block" />
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="space-y-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="space-y-2 p-4 border rounded-xl bg-white"
                  >
                    <Skeleton className="h-6 w-3/4 rounded" />
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-5/6 rounded" />
                    <Skeleton className="h-8 w-full rounded" />
                  </div>
                ))}
            </div>
          ) : assignments.length === 0 ? (
            <p className="text-gray-500">Ямар ч даалгавар ирээгүй байна.</p>
          ) : (
            <>
              {newAssignments.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-600">
                      <ClipboardList className="w-4 h-4" />
                    </span>
                    <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                      Хийх даалгавар
                    </span>
                    <div className="flex-1 border-t border-gray-400 h-px" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newAssignments.map((a) => (
                      <AssignmentCard
                        key={a.id}
                        assignment={a}
                        onSelect={setSelectedAssignment}
                         isSubmitted={!!a.studentSubmission} 
                      />
                    ))}
                  </div>
                </div>
              )}
              {pendingAssignments.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-100 text-yellow-600">
                      <Hourglass className="w-4 h-4" />
                    </span>
                    <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                      Шалгагдаж байгаа
                    </span>
                    <div className="flex-1 border-t border-gray-400 h-px" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pendingAssignments.map((assignment) => (
                      <AssignmentCard
                        key={assignment.id}
                        assignment={assignment}
                        onSelect={setSelectedAssignment}
                        isSubmitted={!!assignment.studentSubmission} 
                      />
                    ))}
                  </div>
                </div>
              )}

              {completedAssignments.length > 0 && (
                <div className="mt-10">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                    </span>
                    <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                      Шалгагдсан
                    </span>
                    <div className="flex-1 border-t border-gray-400 h-px" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {completedAssignments.map((assignment) => (
                      <AssignmentCard
                        key={assignment.id}
                        assignment={assignment}
                        score={assignment.studentSubmission?.score}
                        onSelect={setSelectedAssignment}
                        isSubmitted={!!assignment.studentSubmission} 
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
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
