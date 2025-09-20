export interface Room {
  id: string;
  code: string;
  homeworkTitle: string;
  submissions: Submission[];
  createdAt: Date;
}

// {
//     "id": 1,
//     "assignmentId": 1,
//     "studentId": 1,
//     "status": "APPROVED",
//     "answerText": null,
//     "fileUrl": "uploads/1758345976471-IMG_7057.PNG,uploads/1758345976482-IMG_7056.PNG",
//     "score": 100,
//     "feedback": null,
//     "aiAnalysis": null,
//     "submittedAt": "2025-09-20T05:26:16.991Z"
// }

export interface studentAssignment {
  id:number,
  assignmentId:number,
  studentId:number,
  status:string,
  answerText:string,
  fileUrl:string,
  score:number,
  feedback:string,
  aiAnalysis:string,
  submittedAt:string
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