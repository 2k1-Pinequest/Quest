"use client";
import { useState } from "react";
import { Question } from "@/types/quiz";

interface QuestionFormProps {
  onAddQuestion: (question: Question) => void;
}

export default function QuestionForm({ onAddQuestion }: QuestionFormProps) {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswers, setCurrentAnswers] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const addQuestion = () => {
    if (!currentQuestion.trim() || !currentAnswers.every((a) => a.trim())) return;

    const newQuestion: Question = {
      id: Date.now().toString(),
      question: currentQuestion,
      answers: [...currentAnswers],
      correctAnswer,
    };

    onAddQuestion(newQuestion);
    setCurrentQuestion("");
    setCurrentAnswers(["", "", "", ""]);
    setCorrectAnswer(0);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Add New Question</h3>
      <div className="space-y-4">
        {/* Question */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question
          </label>
          <textarea
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            rows={3}
            placeholder="Enter your question..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent 
                       resize-none"
          />
        </div>

        {/* Answers */}
        <div className="grid grid-cols-2 gap-3">
          {currentAnswers.map((answer, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Answer {index + 1}
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={correctAnswer === index}
                  onChange={() => setCorrectAnswer(index)}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => {
                    const updated = [...currentAnswers];
                    updated[index] = e.target.value;
                    setCurrentAnswers(updated);
                  }}
                  placeholder={`Answer ${index + 1}`}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg 
                             focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addQuestion}
          disabled={
            !currentQuestion.trim() || !currentAnswers.every((a) => a.trim())
          }
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 
                     text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Add Question
        </button>
      </div>
    </div>
  );
}
