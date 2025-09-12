"use client";
import React, { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

import axios from "axios";

export default function UploadFile() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  console.log("fiel", file);

  const handleUpload = async () => {
    if (!file) return alert("Файл сонгоно уу");

    const formData = new FormData();
    formData.append("quizFile", file);

    console.log("formData", formData);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:4200/api/quizzes/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Файл амжилттай илгээгдлээ!");
      console.log("Response:", res.data);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Файл илгээхэд алдаа гарлаа!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div
        className={`w-[90%] sm:w-[500px] h-[150px] sm:h-[200px] border-2 rounded-xl flex flex-col items-center justify-center cursor-pointer transition ${
          isDragging ? "border-purple-500 bg-purple-50" : "border-gray-300"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500 mb-2" />
        <p className="text-gray-600 font-medium text-sm sm:text-base">
          Хичээлийн файл аа оруулаарай
        </p>
        <p className="text-xs sm:text-sm text-gray-400 text-center">
          Байршуулахын тулд товшино уу эсвэл чирж буулгана уу
        </p>
        <p className="text-[10px] sm:text-xs text-gray-400">
          Зөвхөн PDF файлууд
        </p>
        <input
          type="file"
          id="fileInput"
          accept=".pdf,.pptx,.json"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {file && (
        <div className="mt-4 flex flex-col items-center">
          <p className="text-xs sm:text-sm text-gray-700">
            Сонгосон файл: {file.name}
          </p>
          <Button
            onClick={handleUpload}
            className="mt-2 px-3 py-1 sm:px-4 sm:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm sm:text-base"
          >
            Upload File
          </Button>
        </div>
      )}
    </div>
  );
}
