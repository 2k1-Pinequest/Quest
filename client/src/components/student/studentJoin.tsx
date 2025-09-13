"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, UserRoundPlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface StudentJoinProps {
  onBack: () => void;
  onNext: (name: string, roomCode: string) => void;
}

export function StudentJoin({ onNext }: StudentJoinProps) {
  const [roomCode, setRoomCode] = useState("");
  const [studentName, setStudentName] = useState("");

  const handleNext = () => {
    if (roomCode.trim() && studentName.trim()) {
      onNext(studentName.trim(), roomCode.trim().toUpperCase());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex flex-col items-center justify-center px-4 py-8 space-y-6">
       {/* <Button
        variant="ghost"
        className="mb-2 p-2 text-purple-700 hover:bg-gray-200/40 rounded-lg transition-colors self-start"
      >
        <ArrowLeft className="w-5 h-5" />
      </Button> */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <UserRoundPlusIcon className="w-10 h-10 text-white" />
            </div>
        <h1 className="text-4xl font-bold text-green-500 mb-2">Өрөөнд нэгдэх</h1>
        <p className="text-gray-600 text-sm">
          Эхлэхийн тулд хичээлийн код болон нэрээ оруулна уу
        </p>
      </div>  
      <Card className="shadow-xl rounded-2xl p-6 w-full max-w-md">
        <CardContent className="space-y-5 mt-2">
       
          <div>
            <Label htmlFor="roomCode" className="text-sm font-medium">
              Өрөөний код
            </Label>
            <Input
              id="roomCode"
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              placeholder="КОД ОРУУЛАХ"
              maxLength={6}
              className="text-center text-lg font-semibold tracking-widest mt-1"
            />
          </div>

          {/* Name Input */}
          <div>
            <Label htmlFor="studentName" className="text-sm font-medium">
              Нэр
            </Label>
            <Input
              id="studentName"
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Нэрээ бичнэ үү"
              maxLength={20}
              className="mt-1"
            />
          </div>

          {/* Next Button */}
          <Button
            type="button"
            onClick={handleNext}
            disabled={!roomCode.trim() || !studentName.trim()}
            className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-500 text-white rounded-lg py-2"
          >
            <span>Үргэлжлүүлэх</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
