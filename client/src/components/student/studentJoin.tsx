"use client";

import { useState } from "react";
import { ArrowRight, UserRoundPlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface StudentJoinProps {
  onBack?: () => void;
  onNext: (name: string, roomCode: string) => void;
}

export function StudentJoin({ onNext }: StudentJoinProps) {
  const [roomCode, setRoomCode] = useState("");
  const [studentName, setStudentName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!roomCode.trim() || !studentName.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/joinclass/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomCode: roomCode.trim().toUpperCase(),
          studentName: studentName.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to join room");
      }

      const data = await res.json();
      console.log("Server response:", data);

      onNext(studentName.trim(), roomCode.trim().toUpperCase());
    } catch (error) {
      console.error("Error joining room:", error);
      alert("Өрөөнд нэгдэхэд алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <UserRoundPlusIcon className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-green-500 mb-2">
          Өрөөнд нэгдэх
        </h1>
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

          <Button
            type="button"
            onClick={handleNext}
            disabled={!roomCode.trim() || !studentName.trim() || loading}
            className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-500 text-white rounded-lg py-2"
          >
            <span>{loading ? "Нэгдэж байна..." : "Үргэлжлүүлэх"}</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
