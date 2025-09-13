"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import {
  ArrowLeft,
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Bell,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: string;
  message: string;
  type: "success" | "info";
  timestamp: string;
}

export default function StudentDashboard() {
  const router = useRouter();
  const [studentData, setStudentData] = useState<{
    name: string;
    roomCode: string;
  } | null>(null);
  const [submissionType, setSubmissionType] = useState<"text" | "image">(
    "text"
  );
  const [textContent, setTextContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Load student data from localStorage or use mock data
    const stored = localStorage.getItem("studentData");
    if (stored) {
      setStudentData(JSON.parse(stored));
    } else {
      setStudentData({ name: "Тест Сурагч", roomCode: "9A" });
    }

    // Mock notification polling
    const pollForNotifications = () => {
      const mockNotifications: Notification[] = [
        {
          id: "1",
          message: "Багш таны даалгавар шалгаж, батлав ✅",
          type: "success",
          timestamp: new Date().toLocaleString("mn-MN"),
        },
      ];
      setTimeout(() => {
        setNotifications(mockNotifications);
      }, 5000);
    };

    const interval = setInterval(pollForNotifications, 10000);
    pollForNotifications();

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setTextContent("");
      setSubmitted(false);
    }, 3000);
  };

  if (!studentData) {
    return <div>Ачааллаж байна...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/student")}
            className="text-green-600 hover:text-green-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Буцах
          </Button>
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
                    {notifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                        {notifications.length}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80">
                  {notifications.length === 0 ? (
                    <DropdownMenuItem className="text-gray-500">
                      Шинэ мэдэгдэл байхгүй
                    </DropdownMenuItem>
                  ) : (
                    notifications.map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        className="flex flex-col gap-1"
                      >
                        <p className="font-medium text-gray-800">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500">
                          {notification.timestamp}
                        </p>
                      </DropdownMenuItem>
                    ))
                  )}
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

        {/* Submission Feedback */}
        {submitted && (
          <Card className="mb-6 bg-green-50 border-green-200">
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
                <FileText className="h-4 w-4 mr-2" />
                Бичвэр
              </Button>
              <Button
                variant={submissionType === "image" ? "default" : "outline"}
                onClick={() => setSubmissionType("image")}
                className="flex-1"
              >
                <Upload className="h-4 w-4 mr-2" />
                Зураг
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

            <Button
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
              disabled={submissionType === "text" && !textContent.trim()}
            >
              Даалгавар илгээх
            </Button>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-blue-600" />
              Заавар
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
      </div>
    </div>
  );
}
