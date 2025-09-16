"use client";
import { GraduationCap, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function ActionButton() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-blue-400 mb-4 tracking-tight">
            Edu<span className="text-blue-700">Snap</span>
          </h1>
          <p className="text-base md:text-xl text-gray-500  max-w-xl mx-auto">
            AI-аар гэрийн даалгавар үнэлэх, санал хүсэлт өгөх, ахиц дэвшлийг
            хянах ухаалаг систем
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href={"/teacherRoom"}>
            <div className="p-8 w-full bg-white h-[300px] rounded-2xl border transform hover:scale-105 transition-all duration-300 cursor-pointer group flex flex-col gap-7">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-medium text-black">Багш</h2>
                <div className="font-normal text-md text-gray-500 ">  
                  Даалгавар үүсгэх, өрөө удирдах, AI үнэлгээ авах
                </div>
              </div>
              <Button variant="secondary">Дэлгэрэнгүй</Button>
            </div>
          </Link>

          <Link href={"/studentRoom"}>
            <div className="p-8 w-full bg-white h-[300px] rounded-2xl border transform hover:scale-105 transition-all duration-300 cursor-pointer group flex flex-col gap-7">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-medium text-black">Сурагч</h2>
                <div className="font-normal text-md text-gray-500 ">  
                 Гэрийн даалгавар илгээх
                </div>
              </div>
              <Button variant="secondary">Дэлгэрэнгүй</Button>
            </div>
          </Link>
          
        </div>
        <div className="text-center mt-50 text-md md:text-sm text-gray-700">
          Боловсролыг хиймэл оюун ухаанаар шинэчилж байна
        </div>
      </div>
    </div>
  );
}
