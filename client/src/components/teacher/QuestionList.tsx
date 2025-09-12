import { Quiz, Question } from "@/types/quiz";
import { Play } from "lucide-react";

interface QuestionListProps {
  questions: Question[];
  onStartQuiz: () => void;
  roomName: string;
}

export default function QuestionList({
  questions,
  onStartQuiz,
  roomName,
}: QuestionListProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          Questions ({questions.length})
        </h3>
        {questions.length > 0 && (
          <button
            onClick={onStartQuiz}
            disabled={!roomName.trim()}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 
                       text-white px-4 py-2 rounded-lg font-medium flex items-center 
                       space-x-2 transition-colors"
          >
            <Play className="w-4 h-4" />
            <span>Start Quiz</span>
          </button>
        )}
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {questions.map((q, index) => (
          <div
            key={q.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <h4 className="font-medium text-gray-900 mb-2">
              Question {index + 1}
            </h4>
            <p className="text-gray-700 mb-3">{q.question}</p>
            <div className="grid grid-cols-2 gap-2">
              {q.answers.map((ans, i) => (
                <div
                  key={i}
                  className={`p-2 rounded text-sm ${
                    i === q.correctAnswer
                      ? "bg-green-100 text-green-800 font-medium"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {ans}
                </div>
              ))}
            </div>
          </div>
        ))}

        {questions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No questions added yet. Create your first question to get started!
          </div>
        )}
      </div>
    </div>
  );
}
