"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, X, Loader2 } from "lucide-react";

import axios from "axios";

import { toast } from "sonner";
import { Assignment, studentAssignment } from "@/types";

interface JwtPayload {
  id: string;
  studentName: string;
}

export default function Student({ assignment }: { assignment: Assignment }) {
  console.log("assignment", assignment);

  const [submission, setSubmission] = useState<studentAssignment | null>(null);

  const [loading, setLoading] = useState(false);

  const [studentData, setStudentData] = useState<{
    studentName: string;
    roomCode: string;
  } | null>(null);

  const [files, setFiles] = useState<File[]>([]);

  // const [imageFile, setImageFile] = useState<File | null>(null);

  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...droppedFiles]);
    }
  };

  /////////////////////////////
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

  ///////////////////////////// SUBMISSION BAIGAA ESEH
  useEffect(() => {
    if (!assignment?.id) return;

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/submissions/${assignment.id}/2`)
      .then((res) => {
        console.log("resss", res.data.submission);

        if (res.data?.submission) {
          setSubmission(res.data.submission); // Хүүхэд нэг л удаа илгээх эрхтэй
        } else {
          setSubmission(null);
        }
      })
      .catch((err) => {
        console.error("Submission fetch error:", err);
        setSubmission(null); // 404 үед null болгож хадгална
      });
  }, [assignment?.id]);

  console.log("submission", submission);

  const handleSubmit = async () => {
    if (files.length === 0) {
      alert("Та даалгавраа бичвэрээр эсвэл зураг хэлбэрээр оруулна уу!");
      return;
    }

    const formData = new FormData();
    files.forEach((f) => formData.append("files", f));
    formData.append("assignmentId", assignment.id.toString());

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/studentAssign/analyzeAssignment/2`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data?.submission) {
        toast.success("Гэрийн даалгавар амжилттай илгээгдлээ ✅");
        // шууд submission-ийг шинэчилнэ
        setSubmission(response.data.submission);
        setFiles([]); // сонгосон файлуудыг цэвэрлэж болно
      } else {
        toast.error("Даалгавар хадгалах явцад алдаа гарлаа");
      }
    } catch (error) {
      console.error("Upload алдаа:", error);
      toast.error("Сервертэй холбогдоход алдаа гарлаа");
    } finally {
      setLoading(false);
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
            <p className="text-gray-700 font-medium">
              Багш руу илгээж байна...
            </p>
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
          <ul className="pl-5 space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span>📸</span>
              <span>Зургаа тод дарна уу</span>
            </li>
            <li className="flex items-start gap-2">
              <span>🤖</span>
              <span>AI анхны үнэлгээ хийх ба багш эцсийн үнэлгээ өгнө</span>
            </li>
            <li className="flex items-start gap-2">
              <span>⚠️</span>
              <span>Нэг л удаа явуулах учир анхааралтай явуулна уу</span>
            </li>
          </ul>
        </div>

        {/* Upload хэсэг */}
        <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              {submission
                ? "Даалгавар илгээгдсэн ✅"
                : files.length > 0
                ? "Даалгавар бэлэн, илгээхэд бэлэн"
                : "Гэрийн даалгавраа оруулах"}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {!submission ? (
              // Хэрэв submission байхгүй бол upload хэсэг
              <div className="space-y-4">
                {files.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {files.map((f, idx) => (
                      <div
                        key={idx}
                        className="relative w-full h-28 rounded-lg overflow-hidden border shadow-sm"
                      >
                        <img
                          src={URL.createObjectURL(f)}
                          alt={`Зураг ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setFiles((prev) =>
                              prev.filter((_, i) => i !== idx)
                            );
                          }}
                          className="absolute top-1 right-1 bg-white/90 text-red-500 rounded-full p-1 hover:bg-red-500 hover:text-white shadow transition"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {/* Upload Button */}
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="flex justify-center"
                >
                  <label
                    htmlFor="imageUpload"
                    className="w-full flex justify-center items-center gap-2 py-1 rounded-xl text-sm font-medium cursor-pointer rounded-xl border border-dashed border-gray-400 text-gray-600 hover:bg-gray-50 cursor-pointer transition"
                  >
                    <span className="text-lg font-medium">➕</span>
                    <span className="text-sm font-medium">Зураг нэмэх</span>
                  </label>
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                {/* Preview images (just below upload) */}

                {/* Submit Button */}
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm font-medium"
                >
                  Даалгавар илгээх
                </Button>
              </div>
            ) : (
              // Хэрэв submission байгаа бол preview хэсэг
              <div className="space-y-3 p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <p className="text-gray-600 text-sm font-medium flex items-center gap-1">
                  ✅ Та өмнө нь даалгавраа илгээсэн байна. Давхар илгээх
                  боломжгүй
                </p>
                {submission.fileUrl && submission.fileUrl.trim() !== "" ? (
                  <div className="grid grid-cols-2 gap-3">
                    {submission.fileUrl
                      .split(",")
                      .filter((url: string) => url.trim() !== "")
                      .map((url: string, idx: number) => (
                        <img
                          key={idx}
                          src={url}
                          alt={`Даалгаврын зураг ${idx + 1}`}
                          className="w-full h-32 object-cover rounded-lg shadow-sm border"
                        />
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">
                    Даалгаврын зураг байхгүй байна.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
