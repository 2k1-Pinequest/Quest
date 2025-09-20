"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface Student {
  id: number;
  studentName: string;
  email: string;
}

interface Assignment {
  id: number;
  title: string;
}

interface AIAnalysis {
  score: number;
  summary: string;
  mistakes: string[];
  suggestions: string[];
  overall: string;
}

interface Submission {
  id: number;
  fileUrl: string[][]; // массивын массив байна гэж тэмдэглэсэн
  student: Student;
  assignment: Assignment;
  aiAnalysis: AIAnalysis | null;
}

export default function SubmissionsAssignments() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4200/assignments/submissions")
      .then((res) => setSubmissions(res.data.submissions))
      .catch((err) => console.error(err));
  }, []);
  console.log(
    "+++++++++",
    submissions.map((s) => s.fileUrl)
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Сурагчдын Submissions</h1>

      {submissions.map((s) => (
        <div
          key={s.id}
          className="mb-6 p-4 border rounded-lg shadow flex flex-col md:flex-row gap-6"
        >
          {/* Left: Images */}
          <div className="w-full md:w-1/3">
            <h2 className="font-semibold">{s.student.studentName}</h2>
            <p className="text-gray-600">{s.assignment.title}</p>

            {s.fileUrl.length > 0 ? (
              <div className="flex gap-2 flex-wrap">
                {s.fileUrl.flat().map((url, i) => (
                  <div key={i} className="w-24 h-24 relative">
                    <Image
                      src={`http://localhost:4200/${url}`}
                      alt="submission"
                      fill
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>Зураг ирээгүй байна</p>
            )}
          </div>

          {/* Right: AI Analysis */}
          <div className="flex-1 p-4 bg-gray-100 rounded">
            <h3 className="font-semibold mb-2">AI Analysis</h3>
            {s.aiAnalysis ? (
              <>
                <p>
                  <strong>Score:</strong> {s.aiAnalysis.score}
                </p>
                <p>
                  <strong>Summary:</strong> {s.aiAnalysis.summary}
                </p>
                <p>
                  <strong>Mistakes:</strong> {s.aiAnalysis.mistakes.join(", ")}
                </p>
                <p>
                  <strong>Suggestions:</strong>{" "}
                  {s.aiAnalysis.suggestions.join(", ")}
                </p>
                <p>
                  <strong>Overall:</strong> {s.aiAnalysis.overall}
                </p>
              </>
            ) : (
              <p>AI analysis байхгүй</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
