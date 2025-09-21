// src/types.ts

// Сурагчийн хариулт
export interface StudentSubmission {
  id: string; // ID should match your database type (e.g., string for MongoDB, number for Postgres)
  assignmentId: number;
  studentId: number;

  // Даалгаврын статус
  status: "PENDING" | "ANALYZING" | "ANALYZED" | "APPROVED";

  // Хариултын агуулга
  answerText?: string | null;
  fileUrl?: string | null;

  // Багшийн болон AI-ийн үнэлгээ
  score?: number | null; // Багш эсвэл AI-ийн өгсөн оноо
  feedback?: string | null; // Багшийн санал

  // AI-ийн дэлгэрэнгүй анализ (AI-н оноо, алдаа, санал г.м)
  aiAnalysis?: {
    score: number;
    summary: string;
    mistakes: string[];
    suggestions: string[];
    overall: string;
  } | null;

  submittedAt: string; // Он цагийн төрөл нь ихэвчлэн string байдаг
}

export interface studentAssignment {
  id: number;
  assignmentId: number;
  studentId: number;
  status: string;
  answerText: string;
  fileUrl: string;
  score: number;
  feedback: string;
  aiAnalysis: string;
  submittedAt: string;
}

export interface Submission {
  id: string;
  studentName: string;
  roomCode: string;
  content: string;
  type: "upload" | "text";
  aiScore: number;
  aiFeedback: string;
  aiSuggestions: string[];
  teacherReview?: {
    status: "approved" | "rejected" | "pending";
    comment: string;
    finalScore?: number;
  };
  submittedAt: Date;
}

// Даалгавар
// {
//         "id": 16,
//         "title": "geometry",
//         "description": "budaa",
//         "createdAt": "2025-09-21T05:43:08.109Z",
//         "updatedAt": "2025-09-21T05:43:08.109Z",
//         "textContent": "budaa",
//         "dueDate": "2025-09-26T16:00:00.000Z",
//         "totalSubmissions": 2,
//         "approvedSubmissions": 1,
//         "isChecked": false
// }
export interface Assignment {
  id: number;
  roomId: number;
  title: string;
  description?: string | null;
  textContent?: string | null;
  dueDate?: string | null;
  instruction: string; // Үүнийг нэмсэн нь зөв
  createdAt: string;
  updatedAt: string;
  totalSubmissions: number;
  approvedSubmissions: number;
  isChecked: boolean;

  // Энэ талбарыг нэмснээр холбоотой Submission мэдээлэл ирнэ
  studentSubmission?: StudentSubmission | null;
}

// Сурагч
export interface Student {
  id: string;
  name: string;
  roomCode: string; // Room-той холбох
  submissions: StudentSubmission[]; // Загварт нийцүүлсэн
  badges: string[];
  totalScore: number;
  progress: ProgressPoint[];
}

// Анги
export interface Room {
  id: string;
  code: string;
  roomName: string; // homeworkTitle гэдгийг roomName болгож өөрчиллөө
  submissions: StudentSubmission[]; // Загварт нийцүүлсэн
  createdAt: string;
}

// Явц
export interface ProgressPoint {
  date: string;
  score: number;
}
