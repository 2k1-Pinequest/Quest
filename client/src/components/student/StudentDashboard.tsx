"use client";

import { useState } from "react";
import { BookOpen, Upload, ChevronLeft, ArrowLeft } from "lucide-react";
import Student from "./studentHomeWork";
import { motion, AnimatePresence } from "framer-motion";

interface Assignment {
  id: string;
  roomId: string;
  title: string;
  instruction: string;
  createdAt: string;
}

export default function StudentDashboard() {
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);

  const room = {
    id: "mockRoom123",
    roomCode: "7MGL3M",
    title: "Classroom Demo",
  };
  const assignments: Assignment[] = [
    {
      id: "assign_1",
      roomId: "mockRoom123",
      title: "Алтан ургын товч танилцуулга",
      instruction: "Номны 23-25р хуудсыг ашиглан тайлбарла",
      createdAt: "10/26/2025",
    },
    {
      id: "assign_2",
      roomId: "mockRoom123",
      title: "Монголын нууц товчоо",
      instruction: "500 үгтэй эсээ бичнэ үү..",
      createdAt: "10/25/2025",
    },
    {
      id: "assign_3",
      roomId: "mockRoom123",
      title: "Монголын нууц товчоо",
      instruction: "500 үгтэй эсээ бичнэ үү..",
      createdAt: "10/25/2025",
    },
  ];

  const handleGoBack = () => console.log("Navigating back...");

  return (
    <div className="flex flex-col min-h-screen px-4 md:px-8 py-8 bg-gray-50">
      <div className="w-full max-w-[1280px] mx-auto flex flex-col">
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleGoBack}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-200 transition"
            >
              <ChevronLeft size={28} />
            </button>
            <div>
              <h1 className="text-3xl ">9А Түүх</h1>
              <p className="text-sm text-gray-500 mt-1">
                Ангийн код: {room.roomCode}
              </p>
            </div>
          </div>
        </header>

        <main className="space-y-8">
          <h3 className="text-2xl ">Ирсэн даалгавар</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all flex flex-col max-h-80"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <BookOpen size={22} className="text-blue-500" />
                  <h4 className="font-semibold text-lg">{assignment.title}</h4>
                </div>

                <p
                  className="text-gray-600 text-sm mb-4 overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {assignment.instruction}
                </p>

                <div className="flex-1"></div>

                <div className="flex flex-col">
                  <div className="text-xs text-gray-500 mb-2">
                    Дуусах хугацаа: {assignment.createdAt}
                  </div>
                  <button
                    onClick={() => setSelectedAssignment(assignment)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl flex items-center justify-center space-x-2 font-medium transition"
                  >
                    <Upload size={16} /> <span>Даалгавар илгээх</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
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
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setSelectedAssignment(null)}
                className="flex items-center absolute top-4 right-4 z-50 p-2 rounded-full text-green-600 hover:text-green-700"
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Гарах
              </button>

              <div className="overflow-y-auto mt-10">
                <Student assignment={selectedAssignment} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
