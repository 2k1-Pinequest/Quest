import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../ui/badge";

interface StudentQuizViewProps {
  studentName: string;
  avatar: string;
  onBack: () => void;
}

export function StudentQuizView({
  studentName,
  avatar,
  onBack,
}: StudentQuizViewProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [score] = useState(1250);

  const currentQuestion = {
    question: "What is the capital of France?",
    answers: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!hasAnswered) {
      setSelectedAnswer(answerIndex);
      setHasAnswered(true);

      setTimeout(() => {
        setShowCorrect(true);
      }, 2000);
    }
  };

  const colors = ["bg-red-500", "bg-blue-500", "bg-yellow-500", "bg-green-500"];
  const shapes = ["▲", "◆", "●", "■"];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{avatar}</span>
              <span className="font-semibold">{studentName}</span>
            </div>
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {score} points
          </Badge>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        {!hasAnswered ? (
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-8">
              {currentQuestion.question}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {currentQuestion.answers.map((answer, index) => (
                <Card
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`cursor-pointer transform transition-all duration-200 hover:scale-105 ${colors[index]}`}
                >
                  <CardContent className="flex items-center space-x-6 p-8">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl font-bold">
                      {shapes[index]}
                    </div>
                    <span className="font-semibold text-xl">{answer}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <Card className="max-w-2xl mx-auto text-center p-8">
            <CardHeader>
              <CardTitle>
                {showCorrect ? "Answer Results" : "Answer Submitted!"}
              </CardTitle>
            </CardHeader>

            {!showCorrect ? (
              <div className="mb-6">
                <div className="text-6xl mb-4">⏳</div>
                <p className="text-gray-300">Waiting for other players...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-4xl mb-4">
                  {selectedAnswer === currentQuestion.correctAnswer
                    ? "🎉"
                    : "😔"}
                </div>

                <Badge
                  className={`p-4 rounded-lg ${
                    selectedAnswer === currentQuestion.correctAnswer
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {selectedAnswer === currentQuestion.correctAnswer
                    ? "Correct! Well done!"
                    : "Incorrect. Better luck next time!"}
                </Badge>

                <Card className="bg-green-600 p-4 rounded-lg">
                  <p className="text-sm text-green-100">Correct Answer:</p>
                  <p className="font-semibold">
                    {currentQuestion.answers[currentQuestion.correctAnswer]}
                  </p>
                </Card>

                {selectedAnswer === currentQuestion.correctAnswer && (
                  <Badge className="bg-yellow-600 p-4 rounded-lg font-bold">
                    +200 points!
                  </Badge>
                )}
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
