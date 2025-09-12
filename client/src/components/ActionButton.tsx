"use client"
import {
  BarChart3,
  Bot,
  GraduationCap,
  Play,
  Trophy,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function ActionButton() {
     const router = useRouter();

  const [showCreateRoom, setShowCreateRoom] = useState(false);

  const handleToggle = () => {
    setShowCreateRoom(!showCreateRoom);
    router.push("/teacherRoom");
  };

  const handleToggleJoin = () => {
    setShowCreateRoom(!showCreateRoom);
    router.push("/studentRoom");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-7xl font-black text-white mb-6 tracking-tight">
            gah<span className="text-yellow-400">too</span>
          </h1>
          <p className="text-2xl text-purple-100 font-medium max-w-2xl mx-auto">
            bagsh shaviin barildlaga
          </p>
        </div>

        {/* User Type Selection */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Teacher Card */}
          <button
              onClick={handleToggle}
            className="bg-white rounded-3xl shadow-2xl p-12 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer group"
          >
            <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <GraduationCap className="w-16 h-16 text-white" />
            </div>

            <h2 className="text-4xl font-bold text-gray-800 mb-4">hamag bvdvvn darga</h2>

            <p className="text-xl text-gray-600 mb-8">
              anhaan
            </p>

            <div className="flex justify-center gap-6 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4" />
                <span>AI Questions</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </div>
            </div>
          </button>

          {/* Student Card */}
          <button
              onClick={handleToggleJoin}
            className="bg-white rounded-3xl shadow-2xl p-12 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer group"
          >
            <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Users className="w-16 h-16 text-white" />
            </div>

            <h2 className="text-4xl font-bold text-gray-800 mb-4">shavij</h2>

            <p className="text-xl text-gray-600 mb-8">
              tiin thh
            </p>

            <div className="flex justify-center gap-6 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                <span>Real-time Quiz</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                <span>Leaderboard</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
