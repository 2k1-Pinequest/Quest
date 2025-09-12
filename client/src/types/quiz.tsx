export interface Question {
  id: string;
  question: string;
  answers: string[];
  correctAnswer: number;
  timeLimit?: number;
}
 
export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  roomCode: string;
}
 
export interface Student {
  id: string;
  name: string;
  avatar: string;
  score: number;
}
 
export interface GameState {
  quiz: Quiz | null;
  students: Student[];
  currentQuestion: number;
  isActive: boolean;
  showResults: boolean;
}