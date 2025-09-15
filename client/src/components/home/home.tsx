"use client";
import { Bot, GraduationCap, Play, Users } from "lucide-react";
import Link from "next/link";

export default function ActionButton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-purple-700 mb-4 tracking-tight">
            Edu<span className="text-pink-500">Grade AI</span>
          </h1>
          <p className="text-base md:text-xl text-gray-500  max-w-2xl mx-auto">
            AI-аар гэрийн даалгавар үнэлэх, санал хүсэлт өгөх, ахиц дэвшлийг
            хянах ухаалаг систем
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href={"/teacherRoom"}>
            <button className="w-full bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer group">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">Багш</h2>
              <div className="flex justify-center gap-4 text-gray-500 text-xs md:text-sm">
                <div className="flex items-center gap-1">
                  <Bot className="w-4 h-4" />
                  <span> Даалгавар үүсгэх, өрөө удирдах, AI үнэлгээ авах</span>
                </div>
              </div>
            </button>
          </Link>
          <Link href={"/studentRoom"}>
            <button className="w-full bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer group">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Сурагч</h2>
              <div className="flex justify-center gap-4 text-gray-500 text-xs md:text-sm">
                <div className="flex items-center gap-1">
                  <Play className="w-4 h-4" />
                  <span>Гэрийн даалгавар илгээх</span>
                </div>
              </div>
            </button>
          </Link>
        </div>
        <div className="text-center mt-10 text-xs md:text-sm text-gray-500">
          Боловсролыг хиймэл оюун ухаанаар шинэчилж байна
        </div>
      </div>
    </div>
  );
}
