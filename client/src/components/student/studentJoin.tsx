"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

// ---------------------- StudentJoin Component ----------------------
interface StudentJoinProps {
  onBack: () => void;
  onNext: (name: string, roomCode: string) => void;
}

export function StudentJoin({ onBack, onNext }: StudentJoinProps) {
  const [roomCode, setRoomCode] = useState("");
  const [studentName, setStudentName] = useState("");

  const handleNext = () => {
    if (roomCode.trim() && studentName.trim()) {
      onNext(studentName.trim(), roomCode.trim().toUpperCase());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          className="mb-6 p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
          onClick={onBack}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <Card className="shadow-2xl rounded-2xl p-8">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold mb-2">
              Join Quiz
            </CardTitle>
            <p className="text-center text-gray-600">
              Эхлэхийн тулд өрөөний код болон нэрээ оруулна уу
            </p>
          </CardHeader>
          <CardContent className="space-y-6 mt-6">
            <div>
              <Label htmlFor="roomCode">Room Code</Label>
              <Input
                id="roomCode"
                type="text"
                value={roomCode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRoomCode(e.target.value.toUpperCase())
                }
                placeholder="ENTER CODE"
                maxLength={6}
                className="text-center text-lg font-semibold tracking-widest"
              />
            </div>

            <div>
              <Label htmlFor="studentName">Your Name</Label>
              <Input
                id="studentName"
                type="text"
                value={studentName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStudentName(e.target.value)
                }
                placeholder="Enter your name"
                maxLength={20}
              />
            </div>

            <Button
              type="button"
              onClick={handleNext}
              disabled={!roomCode.trim() || !studentName.trim()}
              className="w-full flex items-center justify-center space-x-2"
            >
              <span>Next</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ---------------------- Parent Component ----------------------
export default function QuizPage() {
  const [step, setStep] = useState(1);

  const handleBack = () => {
    console.log("Back clicked");
    setStep(step - 1);
  };

  const handleNext = (name: string, roomCode: string) => {
    console.log("Student:", name, "Room:", roomCode);
    setStep(step + 1);
  };

  return (
    <div>
      <StudentJoin onBack={handleBack} onNext={handleNext} />
    </div>
  );
}
