export interface Room {
  id: string;
  code: string;
  homeworkTitle: string;
  submissions: Submission[];
  createdAt: Date;
}

export interface Student {
  id: string;
  name: string;
  roomCode: string;
  submissions: Submission[];
  badges: string[];
  totalScore: number;
  progress: ProgressPoint[];
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

export interface ProgressPoint {
  date: Date;
  score: number;
}
 export interface Assignment {
  id: number;
  roomId: number;
  title: string;
  description: string | null;
  textContent: string | null;
  dueDate: string | null;
  instruction: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    submissions: number;
  };
}