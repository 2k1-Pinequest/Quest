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
import { useParams } from "next/navigation";

// Interface definitions (unchanged)
interface Student {
  id: number;
  studentName: string;
  email: string;
}

interface Assignment {
  id: number;
  title: string;
  description: string;
}

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
  fileUrl: string | null;
  score: number | null;
  feedback: string | null;
  aiAnalysis: AiAnalysis | null;
  submittedAt: string;
  student: Student;
  assignment: Assignment;
}

export default function SubmissionsAssignments() {
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>([]);
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const params = useParams();

  useEffect(() => {
    if (!params.assignId) return;

    axios
      .get(`http://localhost:4200/assignments/subs/${params.assignId}`)
      .then((res) => {
        setSubmissions(res.data.submissions);
        setAssignment(res.data.assignment);
      })
      .catch((err) => console.error(err));
  }, [params.assignId]);

  console.log("submissions", submissions);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold ">
        {assignment ? assignment.title : "Даалгавар"}
      </h1>
      <h2 className="mb-4">
        {assignment ? assignment.description : "Тайлбар байхгүй"}
      </h2>

      {submissions.map((s) => (
        <div
          key={s.id}
          className="mb-6 p-4 border rounded-lg shadow flex flex-col md:flex-row gap-6"
        >
          <div className="w-full md:w-1/3">
            <h2 className="font-semibold mb-3">{s.student?.studentName}</h2>

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
                        onClick={() => setSelectedImage(imageUrl)}
                      >
                        <Image
                          src={imageUrl}
                          alt={`submission-${i}`}
                          fill
                          style={{ objectFit: "cover", borderRadius: "8px" }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
          <div className="flex-1 p-4 bg-gray-100 rounded-lg relative ">
            <h3 className="font-semibold mb-2">AI Analysis</h3>
            {s.aiAnalysis ? (
              <>
                <p>
                  <strong>Оноо:</strong> {s.aiAnalysis.score}
                </p>

                <p>
                  <strong>Алдаанууд:</strong> {s.aiAnalysis.mistakes.join(", ")}
                </p>

                <p>
                  <strong>Ерөнхий үнэлгээ:</strong> {s.aiAnalysis.overall}
                </p>
              </>
            ) : (
              <p>AI анализ байхгүй</p>
            )}
            <div className="absolute bottom-4 right-4">
              <ZuwUildel
                submissionId={s.id}
                aiAnalysis={s.aiAnalysis}
                onSubmissionUpdated={() => {}}
              />
            </div>
          </div>
        </div>
      ))}

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-80 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-[90vw] h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={24} />
            </button>

            <div className="relative w-full h-full">
              {" "}
              <Image
                src={selectedImage}
                alt="Full-screen submission"
                fill
                priority={true}
                style={{ objectFit: "contain" }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
