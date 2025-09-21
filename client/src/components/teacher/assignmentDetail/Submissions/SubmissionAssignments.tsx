"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { ZuwUildel } from "./GurvanUildel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useParams } from "next/navigation";

interface Student {
  id: number;
  studentName: string;
  email: string;
}

interface Assignment {
  id: number;
  title: string;
}

// interface AIAnalysis {
//   score: number;
//   summary: string;
//   mistakes: string[];
//   suggestions: string[];
//   overall: string;
// }

// interface Submission {
//   id: number;
//   fileUrl: string[];
//   student: Student;
//   assignment: Assignment;
//   aiAnalysis: AIAnalysis | null;
// }

interface AiAnalysis {
  id: number;
  studentId: number;
  assignmentId: number;
  score: number;
  summary: string;
  mistakes: string[];
  suggestions: string[];
  overall: string;
}

interface AssignmentSubmission {
  id: number;
  assignmentId: number;
  studentId: number;
  status: "APPROVED" | "PENDING" | "REJECTED";
  answerText: string | null;
  fileUrl: string | null; // олон файл байж болох тул массив болговол илүү зөв
  score: number | null;
  feedback: string | null;
  aiAnalysis: AiAnalysis | null;
  submittedAt: string; // ISO date string
}

export default function SubmissionsAssignments() {
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>([]);

  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const params = useParams();

  console.log("params", params.assignId);

  useEffect(() => {
    axios
      .get(`http://localhost:4200/assignments/subs/${params.assignId}`)
      .then((res) => setSubmissions(res.data.submissions))
      .catch((err) => console.error(err));
  }, []);

  console.log("submissions", submissions);
  // console.log("submissions", submissions.su);

  // return <div></div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Сурагчдын Submissions</h1>

      {submissions.map((s) => (
        <div
          key={s.id}
          className="mb-6 p-4 border rounded-lg shadow flex flex-col md:flex-row gap-6"
        >
          {/* Зурагнуудын карусель */}
          <div className="w-full md:w-1/3">
            {/* <h2 className="font-semibold mb-30">{s.studentName}</h2>
            <p className="text-gray-600">{s.assignment.title}</p> */}

            {s.fileUrl ? (
              <Carousel className="w-full h-110 relative">
                <CarouselContent>
                  {s.fileUrl.split(",").map((url, i) => {
                    const imageUrl = url.startsWith("http")
                      ? url
                      : `http://localhost:4200/${url}`;
                    return (
                      <CarouselItem
                        key={i}
                        className="w-full h-110 relative cursor-pointer"
                        onClick={() => {
                          setSelectedSubmission(s);
                          setSelectedImage(imageUrl);
                        }}
                      >
                        <Image
                          src={imageUrl}
                          alt={`submission-${i}`}
                          fill
                          style={{ objectFit: "cover", borderRadius: "8px" }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          onError={() =>
                            console.log("Image load error:", imageUrl)
                          }
                        />
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 p-1 rounded-full shadow">
                  <ChevronLeft />
                </CarouselPrevious>
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 p-1 rounded-full shadow">
                  <ChevronRight />
                </CarouselNext>
              </Carousel>
            ) : (
              <p>Зураг ирээгүй байна</p>
            )}
          </div>

          {/* AI анализ */}
          <div className="flex-1 p-4 bg-gray-100 rounded">
            <h3 className="font-semibold mb-2">AI Analysis</h3>
            {s.aiAnalysis ? (
              <>
                <p>
                  <strong>Оноо:</strong> {s.aiAnalysis.score}
                </p>
                <p>
                  <strong>Дүгнэлт:</strong> {s.aiAnalysis.summary}
                </p>
                <p>
                  <strong>Алдаанууд:</strong> {s.aiAnalysis.mistakes.join(", ")}
                </p>
                <p>
                  <strong>Зөвлөгөө:</strong>{" "}
                  {s.aiAnalysis.suggestions.join(", ")}
                </p>
                <p>
                  <strong>Ерөнхий үнэлгээ:</strong> {s.aiAnalysis.overall}
                </p>
              </>
            ) : (
              <p>AI анализ байхгүй</p>
            )}
            <ZuwUildel
              submissionId={s.id}
              aiAnalysis={s.aiAnalysis}
              onSubmissionUpdated={() => {}}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
