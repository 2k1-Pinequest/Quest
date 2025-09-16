"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import axios from "axios";

import TextareaAutosize from "react-textarea-autosize";

interface Assignment {
  id: string;
  roomId: string;
  title: string;
  instruction: string;
  createdAt: string;
}

interface JwtPayload {
  id: string;
  studentName: string;
}

export default function Student({ assignment }: { assignment: Assignment }) {
  console.log("assignment", assignment?.id);

  const [loading, setLoading] = useState(false);

  const [studentData, setStudentData] = useState<{
    studentName: string;
    roomCode: string;
  } | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // const [imageFile, setImageFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState("");
  const [teacherQuestion, setTeacherQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.files", e.target.files);

    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      console.log("e.dataTransfer.files[0]", e.dataTransfer.files[0]);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        console.log("decoded", decoded);

        setStudentData({
          studentName: decoded.studentName,
          roomCode: "9A",
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
  }, []);

  const handleSubmit = async () => {
    console.log("textContent", textContent);
    console.log("file upload", file);

    if (!textContent.trim() && !file) {
      alert("Та даалгавраа бичвэрээр эсвэл зураг хэлбэрээр оруулна уу!");
      return;
    }
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }

    // formData.append("assignmentId", assignment.id);

    if (!assignment?.id) {
      alert("Assignment ID олдсонгүй!");
      return;
    }
    formData.append("assignmentId", assignment?.id);

    console.log("formData", formData);

    try {
      setLoading(true);
      const response = axios.post(
        "http://localhost:4200/studentAssign/analyzeAssignment/2", // 1 нь studentId жишээ
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // const response = axios.get("http://localhost:4200/hi")

      console.log("response", response);
      const data = await response;

      console.log("data", data);

      // console.log("AI Analysis:", response.data.analysis);
      // console.log("Submission:", response.data.submission);
      // console.log("Даалгавар текст:", textContent);
      // console.log("Даалгавар зураг:", imageFile);
      // console.log("Асуулт багшид:", teacherQuestion);
      // console.log("Student data:", studentData);

      setSubmitted(true);
      setTimeout(() => {
        setTextContent("");
        setTeacherQuestion("");
        setFile(null);
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Upload алдаа:", error);
    } finally {
      setLoading(false); // ← дуусахад loading false
    }
  };

  console.log("fiel", file);

  if (!studentData) return <div>Ачааллаж байна...</div>;

  return (
    <div className="min-h-screen p-4 relative">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl  text-gray-900">
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

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-blue-600" /> заавар{" "}
              {assignment.title}
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

        <Card>
          <CardHeader>
            <CardTitle>Даалгавар илгээх</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Label htmlFor="imageUpload" className="block text-lg font-medium">
              Даалгаврын зураг оруулах (заавал)
            </Label>

            <div
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById("imageUpload")?.click()}
              className="mt-1 border-4 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer bg-blue-50"
            >
              <Upload className="h-16 w-16 mx-auto text-blue-400 mb-3" />
              <p className="text-blue-600 text-lg font-medium">
                Зураг сонгох эсвэл энд тавина уу
              </p>
              <p className="text-sm text-blue-500 mt-1">
                Хүүхэд та гэрийн даалгавраа зураг хэлбэрээр илгээнэ
              </p>
              <Input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3 mt-4"
              disabled={!file}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Илгээж байна...
                </>
              ) : (
                "Даалгавар илгээх"
              )}
            </Button>

            {submitted && (
              <div className="mt-4 border-2 border-green-500 rounded-lg p-4 bg-green-50">
                <p className="font-medium text-green-800 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Амжилттай илгээгдлээ ✅
                </p>
                <p className="text-sm text-green-600 mt-1">
                  Багш таны даалгаврыг шалгаж үнэлгээ өгөх болно.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
