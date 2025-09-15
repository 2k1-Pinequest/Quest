"use client";

import { useState } from "react";
import { BookOpen, Upload, LogOut, ChevronLeft, ArrowLeft } from "lucide-react";
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
  ];

  const handleGoBack = () => console.log("Navigating back...");

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900 font-sans p-4 md:p-8">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleGoBack}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold"> 9А Түүх</h1>
            <p className="text-sm text-gray-500 font-mono">
              Ангийн код: {room.roomCode}
            </p>
          </div>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full flex items-center space-x-2">
          <LogOut size={18} /> Гарах
        </button>
      </header>

      <main className="space-y-6">
        <h3 className="text-xl font-semibold">Ирсэн даалгавар</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <BookOpen size={20} className="text-blue-500" />
                  <h4 className="font-semibold">{assignment.title}</h4>
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                {assignment.instruction}
              </p>
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  Огноо: {assignment.createdAt}
                </div>
                <button
                  onClick={() => setSelectedAssignment(assignment)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-1"
                >
                  <Upload size={16} /> <span>Даалгавар илгээх</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <AnimatePresence>
        {selectedAssignment && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 relative max-h-screen flex flex-col"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedAssignment(null)}
                className="flex items-center absolute top-3 right-3 z-50 p-2 rounded-full text-green-600 hover:text-green-700"
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Гарах
              </button>

              <div className="overflow-y-auto mt-8">
                <Student assignment={selectedAssignment} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
