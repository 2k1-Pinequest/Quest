"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle, AlertCircle, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import axios from "axios";

import TextareaAutosize from "react-textarea-autosize";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";

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

  // const handleSubmit = async () => {
  //   console.log("textContent", textContent);
  //   console.log("file upload", file);

  //   if (!textContent.trim() && !file) {
  //     alert("Та даалгавраа бичвэрээр эсвэл зураг хэлбэрээр оруулна уу!");
  //     return;
  //   }
  //   const formData = new FormData();
  //   if (file) {
  //     formData.append("file", file);
  //   }

  //   // formData.append("assignmentId", assignment.id);

  //   if (!assignment?.id) {
  //     alert("Assignment ID олдсонгүй!");
  //     return;
  //   }
  //   formData.append("assignmentId", assignment?.id);

  //   console.log("formData", formData);

  //   try {
  //     setLoading(true);
  //     const response = axios.post(
  //       `${process.env.NEXT_PUBLIC_API_URL}/studentAssign/analyzeAssignment/1`, // 1 нь studentId жишээ
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     // const response = axios.get("${process.env.NEXT_PUBLIC_API_URL}/hi")

  //     console.log("response", response);
  //     const data = await response;

  //     console.log("data", data);

  //     setSubmitted(true);
  //     setTimeout(() => {
  //       setTextContent("");
  //       setTeacherQuestion("");
  //       setFile(null);
  //       setSubmitted(false);
  //     }, 3000);
  //   } catch (error) {
  //     console.error("Upload алдаа:", error);
  //   } finally {
  //     setLoading(false); // ← дуусахад loading false
  //   }
  // };

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
    formData.append("assignmentId", assignment?.id);

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
      const data =  (await response).status;

      if (data===200) {
        toast.success("Багш руу амжилттай илгээгдлээ")
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
            <CardTitle>
              {submitted ? "Даалгавар илгээгдлээ ✅" : "Даалгавар илгээх"}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Label htmlFor="imageUpload" className="block text-lg font-medium">
              Даалгаврын зураг оруулах (заавал)
            </Label>

            <div
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById("imageUpload")?.click()}
              className="mt-1 border-4 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer bg-blue-50 relative"
            >
              {files.length === 0 ? (
                <>
                  <Upload className="h-16 w-16 mx-auto text-blue-400 mb-3" />
                  <p className="text-blue-600 text-lg font-medium">
                    Гэрийн даалгаврынхаа зургийг оруулна уу
                  </p>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {files.map((f, idx) => (
                    <div key={idx} className="relative">
                      <div className="relative w-full aspect-[4/3]">
                        <img
                          src={URL.createObjectURL(f)}
                          alt={`Даалгаврын зураг ${idx + 1}`}
                          className="w-full h-full object-contain rounded-lg shadow-md border"
                        />
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFiles((prev) => prev.filter((_, i) => i !== idx));
                        }}
                        className="absolute top-2 right-2 bg-white hover:bg-red-600 text-red-600 hover:text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {/* Шинэ зураг нэмэх card */}
                  <div
                    onClick={() =>
                      document.getElementById("imageUpload")?.click()
                    }
                    className="flex items-center justify-center border-4 border-dashed border-blue-300 rounded-lg p-8 cursor-pointer hover:border-blue-400 bg-blue-50"
                  >
                    <Upload className="h-12 w-12 text-blue-400" />
                    <p className="text-blue-600 text-center mt-2">
                      Зураг нэмэх
                    </p>
                    <Input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3 mt-4"
              disabled={loading || submitted}
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
              ) : submitted ? (
                "Даалгавар илгээгдлээ ✅"
              ) : (
                "Даалгавар илгээх"
              )}
            </Button>

            {/* {submitted && (
              <div className="mt-4 border-2 border-green-500 rounded-lg p-4 bg-green-50">
                <p className="font-medium text-green-800 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Амжилттай илгээгдлээ ✅
                </p>
                <p className="text-sm text-green-600 mt-1">
                  Багш таны даалгаврыг шалгаж үнэлгээ өгөх болно.
                </p>
              </div>
            )} */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
