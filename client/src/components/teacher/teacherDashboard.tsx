"use client";

import { useState } from "react";
import { Quiz, Question } from "@/types/quiz";
import { ArrowLeft, Plus, Upload } from "lucide-react";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import UploadSection from "./uploadSection";

interface TeacherDashboardProps {
  onBack: () => void;
  onStartQuiz: (quiz: Quiz) => void;
}

export default function TeacherDashboard({
  onBack,
  onStartQuiz,
}: TeacherDashboardProps) {
  const [activeTab, setActiveTab] = useState<"create" | "upload">("create");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [roomName, setRoomName] = useState("");
  const [roomCode] = useState(() =>
    Math.random().toString(36).substring(2, 8).toUpperCase()
  );

  const handleStartQuiz = () => {
    if (questions.length === 0 || !roomName.trim()) return;
    const quiz: Quiz = {
      id: Date.now().toString(),
      title: roomName,
      questions,
      roomCode,
    };
    onStartQuiz(quiz);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ---------- Header ---------- */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              Teacher Dashboard
            </h1>
          </div>
        </div>
      </header>

      {/* ---------- Main ---------- */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Room name input */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Room name
          </label>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Enter room name..."
            className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
          <button
            onClick={() => setActiveTab("create")}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeTab === "create"
                ? "bg-white text-purple-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Create Questions
          </button>
          <button
            onClick={() => setActiveTab("upload")}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeTab === "upload"
                ? "bg-white text-purple-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Upload className="w-4 h-4 inline mr-2" />
            Upload File
          </button>
        </div>

        {/* Tabs content */}
        {activeTab === "create" && (
          <div className="grid lg:grid-cols-2 gap-8">
            <QuestionForm
              onAddQuestion={(q) => setQuestions((prev) => [...prev, q])}
            />
            <QuestionList
              questions={questions}
              onStartQuiz={handleStartQuiz}
              roomName={roomName}
            />
          </div>
        )}

        {activeTab === "upload" && <UploadSection />}
      </div>
    </div>
  );
}
