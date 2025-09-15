"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";

interface Assignment {
  id: string;
  roomId: string;
  title: string;
  instruction: string;
  createdAt: string;
}

interface Notification {
  id: string;
  message: string;
  type: "success" | "info";
  timestamp: string;
}

interface JwtPayload {
  id: string;
  studentName: string;
}

export default function Student({ assignment }: { assignment: Assignment }) {
  const [studentData, setStudentData] = useState<{
    studentName: string;
    roomCode: string;
  } | null>(null);
  const [submissionType, setSubmissionType] = useState<"text" | "image">(
    "text"
  );
  const [textContent, setTextContent] = useState("");
  const [teacherQuestion, setTeacherQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [readIds, setReadIds] = useState<string[]>([]);

  useEffect(() => {
    // JWT decode
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setStudentData({
          studentName: decoded.studentName,
          roomCode: "9A", // та серверээс авч болдог бол эндээс солино
        });
      } catch (e) {
        console.error("Token decode error:", e);
      }
    } else {
      setStudentData({
        studentName: "Тест Сурагч",
        roomCode: "9A",
      });
    }

    const savedReadIds: string[] = JSON.parse(
      localStorage.getItem("readNotifications") || "[]"
    );
    setReadIds(savedReadIds);
  }, []);

  const handleSubmit = () => {
    if (!textContent.trim() && submissionType === "text") return;
    console.log("Даалгавар:", textContent);
    console.log("Асуулт багшид:", teacherQuestion);
    setSubmitted(true);
    setTimeout(() => {
      setTextContent("");
      setTeacherQuestion("");
      setSubmitted(false);
    }, 3000);
  };

  const markAsRead = (id: string) => {
    if (!readIds.includes(id)) {
      const updated = [...readIds, id];
      setReadIds(updated);
      localStorage.setItem("readNotifications", JSON.stringify(updated));
    }
  };

  const unreadCount = notifications.filter(
    (n) => !readIds.includes(n.id)
  ).length;

  if (!studentData) return <div>Ачааллаж байна...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">
                Сайн байна уу, {studentData.studentName}!
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-medium">Ангийн код:</span>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {studentData.roomCode}
              </Badge>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              {assignment.title}
              <AlertCircle className="h-5 w-5 mr-2 text-blue-600" /> Заавар
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-600">
              <li>• Даалгавраа зөв, тодорхой хариулна уу</li>
              <li>• Зураг тодорхой, уншиж болохуйц байх ёстой</li>
              <li>• AI системээс анхны үнэлгээ авах болно</li>
              <li>• Багш эцсийн үнэлгээ өгөх болно</li>
            </ul>
          </CardContent>
        </Card>

        {/* Submission Feedback */}
        {submitted && (
          <div className="fixed top-4 right-4 z-50">
            <Card className="bg-green-50 border-green-200 shadow-lg">
              <CardContent className="flex items-center p-4">
                <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                <div>
                  <p className="font-medium text-green-800">
                    Амжилттай илгээгдлээ ✅
                  </p>
                  <p className="text-sm text-green-600">
                    Багш таны даалгаврыг шалгаж, үнэлгээ өгөх болно.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Submission Form */}
        <Card>
          <CardHeader>
            <CardTitle>Даалгавар илгээх</CardTitle>
            <CardDescription>
              Даалгавраа зураг эсвэл бичвэр хэлбэрээр илгээнэ үү
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Type Selection */}
            <div className="flex gap-2">
              <Button
                variant={submissionType === "text" ? "default" : "outline"}
                onClick={() => setSubmissionType("text")}
                className="flex-1"
              >
                <FileText className="h-4 w-4 mr-2" /> Бичвэр
              </Button>
              <Button
                variant={submissionType === "image" ? "default" : "outline"}
                onClick={() => setSubmissionType("image")}
                className="flex-1"
              >
                <Upload className="h-4 w-4 mr-2" /> Зураг
              </Button>
            </div>

            {/* Content Input */}
            {submissionType === "text" ? (
              <div>
                <Label htmlFor="textContent">Даалгаврын хариулт</Label>
                <Textarea
                  id="textContent"
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder="Даалгаврын хариултаа энд бичнэ үү..."
                  rows={6}
                  className="mt-1"
                />
              </div>
            ) : (
              <div>
                <Label htmlFor="imageUpload">Зураг сонгох</Label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-600">
                    Зураг сонгох эсвэл энд тавина уу
                  </p>
                  <Input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    className="mt-3"
                  />
                </div>
              </div>
            )}

            {/* Багшид асуух асуулт */}
            <div>
              <Label htmlFor="teacherQuestion">
                Багшаас асуух асуулт (optional)
              </Label>
              <Textarea
                id="teacherQuestion"
                value={teacherQuestion}
                onChange={(e) => setTeacherQuestion(e.target.value)}
                placeholder="Багшаас асуух асуултаа энд бичнэ үү..."
                rows={3}
                className="mt-1"
              />
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
              disabled={submissionType === "text" && !textContent.trim()}
            >
              Даалгавар илгээх
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
