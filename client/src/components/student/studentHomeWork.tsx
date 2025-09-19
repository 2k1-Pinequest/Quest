"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  X,
  Loader2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import axios from "axios";

import TextareaAutosize from "react-textarea-autosize";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";
import { Assignment } from "@/types";

// interface Assignment {
//   id: number;
//   roomId: string;
//   title: string;
//   instruction: string;
//   createdAt: string;
// }

interface JwtPayload {
  id: string;
  studentName: string;
}

export default function Student({ assignment }: { assignment: Assignment }) {
  console.log("assignment", assignment);

  const [loading, setLoading] = useState(false);

  const [studentData, setStudentData] = useState<{
    studentName: string;
    roomCode: string;
  } | null>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // const [imageFile, setImageFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState("");
  const [teacherQuestion, setTeacherQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  // const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();

  //   setIsDragging(false);
  //   if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
  //     setFile(e.dataTransfer.files[0]);
  //     console.log("e.dataTransfer.files[0]", e.dataTransfer.files[0]);
  //   }
  // };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...droppedFiles]);
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
    console.log("file upload", files);

    if (!textContent.trim() && files.length === 0) {
      alert("Та даалгавраа бичвэрээр эсвэл зураг хэлбэрээр оруулна уу!");
      return;
    }

    const formData = new FormData();
    if (files) {
      files.forEach((f) => formData.append("files", f));
    }

    // formData.append("assignmentId", assignment.id);

    if (!assignment?.id) {
      alert("Assignment ID олдсонгүй!");
      return;
    }
    formData.append("assignmentId", assignment?.id.toString());

    console.log("formData", formData);

    try {
      setLoading(true);
      const response = axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/studentAssign/analyzeAssignment/2`, // 1 нь studentId жишээ
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("response", response);
      const data = (await response).status;

      if (data === 200) {
        toast.success("Багш руу амжилттай илгээгдлээ");
      }

      console.log("data", data);

      setSubmitted(true);
    } catch (error) {
      console.error("Upload алдаа:", error);
    } finally {
      setLoading(false); // ← дуусахад loading false
    }
  };
  console.log("fiel", files);

  if (!studentData) return <div>Ачааллаж байна...</div>;

  return (
    <div className=" p-6 bg-gray-50 flex justify-center">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/50 backdrop-blur-[1px]">
          <div className="flex flex-col items-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-700 font-medium">Багш руу илгээж байна...</p>
          </div>
        </div>
      )}
      <div className="w-full max-w-2xl space-y-6">
        {/* Даалгаврын нэр */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {assignment.title}
          </h2>
        </div>

        {/* Заавар хэсэг minimal */}
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-sm text-blue-800 space-y-1">
          <p className="font-medium flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            Даалгавар оруулахдаа анхаарах зүйлс:
          </p>
          <ul className="pl-4 list-disc text-gray-700 space-y-1">
            <li>📸 Зургаа тод, төвлөрсөн, уншиж болохуйц байлгаарай</li>
            <li>🤖 AI анхны үнэлгээ хийх ба багш эцсийн үнэлгээ өгнө</li>
          </ul>
        </div>

        {/* Upload хэсэг */}
        <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              {submitted
                ? "Даалгавар илгээгдсэн ✅"
                : "Гэрийн даалгавраа оруулах"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label
              htmlFor="imageUpload"
              className="text-sm font-medium text-gray-700"
            >
              Даалгаврын зураг оруулах
            </Label>

            {/* Upload button дээр дарж зураг нэмэх */}
            <div className="flex justify-end mb-2">
              <button
                onClick={() => document.getElementById("imageUpload")?.click()}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                Зураг нэмэх
              </button>
            </div>

            <div
              onDrop={handleDrop}
              onDragLeave={() => setIsDragging(false)}
              className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center bg-gray-50"
            >
              {files.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  Зургаа чирж эсвэл энд харагдахгүй upload хийнэ үү
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {files.map((f, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={URL.createObjectURL(f)}
                        alt={`Зураг ${idx + 1}`}
                        className="w-full h-32 object-cover rounded border"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFiles((prev) => prev.filter((_, i) => i !== idx));
                        }}
                        className="absolute top-1 right-1 bg-white text-red-500 rounded-full shadow p-1 hover:bg-red-500 hover:text-white"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <Input
                id="imageUpload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm font-medium mt-4"
            >
              Даалгавар илгээх
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
