"use client";

import { useEffect, useState } from "react";

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
import { Upload, FileText, CheckCircle, AlertCircle, Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
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

interface TeacherFeedback {
  id: string;
  message: string;
  timestamp: string;
  status: "approved" | "rejected" | "pending";
}

interface TeacherAssignment {
  id: string;
  question: string;
  createdAt: string;
}

export default function Student({ assignment }: { assignment: Assignment }) {
  const [studentData, setStudentData] = useState<{
    name: string;
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
  const [teacherFeedback, setTeacherFeedback] = useState<TeacherFeedback[]>([]);
  const [teacherAssignments, setTeacherAssignments] = useState<
    TeacherAssignment[]
  >([]);

  useEffect(() => {
    const stored = localStorage.getItem("studentData");
    if (stored) setStudentData(JSON.parse(stored));
    else setStudentData({ name: "Тест Сурагч", roomCode: "9A" });

    const savedReadIds: string[] = JSON.parse(
      localStorage.getItem("readNotifications") || "[]"
    );
    setReadIds(savedReadIds);

    // Mock notifications
    setNotifications([
      {
        id: "1",
        message: "Багш таны даалгавар шалгаж, батлав ✅",
        type: "success",
        timestamp: new Date().toLocaleString("mn-MN"),
      },
    ]);

    // Mock teacher feedback
    setTeacherFeedback([
      {
        id: "1",
        message: "Сайн ажилласан, оноо 90/100 ",
        timestamp: new Date().toLocaleString("mn-MN"),
        status: "approved",
      },
    ]);

    // Mock teacher assignments
    setTeacherAssignments([
      {
        id: "1",
        question: "Өнөөдрийн хичээл дээрх жишээг тайлбарлаарай",
        createdAt: new Date().toLocaleString("mn-MN"),
      },
      {
        id: "2",
        question: "Дараагийн даалгавар: 10 бодлого бодох",
        createdAt: new Date().toLocaleString("mn-MN"),
      },
    ]);
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
                Сайн байна уу, {studentData.name}!
              </h1>

              {/* Notification Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative">
                    <Bell className="h-5 w-5 text-gray-700" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80">
                  {notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className="flex flex-col gap-1 cursor-pointer"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <p
                        className={`font-medium ${
                          readIds.includes(notification.id)
                            ? "text-gray-400"
                            : "text-gray-800"
                        }`}
                      >
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500">
                        {notification.timestamp}
                      </p>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
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

        {/* Teacher Assignments */}
        {teacherAssignments.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Багшийн даалгавар</CardTitle>
              <CardDescription>
                Багшийн өмнө өгсөн даалгавар болон асуултууд
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {teacherAssignments.map((ta) => (
                <div
                  key={ta.id}
                  className="border p-3 rounded-lg bg-white shadow-sm"
                >
                  <p className="font-medium text-gray-800">{ta.question}</p>
                  <p className="text-xs text-gray-500">{ta.createdAt}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

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

        {/* Teacher Feedback Section */}
        {teacherFeedback.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Багшийн үнэлгээ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {teacherFeedback.map((f) => (
                <div
                  key={f.id}
                  className="border p-3 rounded-lg bg-white shadow-sm"
                >
                  <p
                    className={`font-medium ${
                      f.status === "approved"
                        ? "text-green-600"
                        : f.status === "rejected"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {f.message}
                  </p>
                  <p className="text-xs text-gray-500">{f.timestamp}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
