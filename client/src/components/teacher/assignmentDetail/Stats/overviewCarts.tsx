import { Submission } from "@/types";
import { BarChart3, TrendingUp, Trophy, Users } from "lucide-react";


interface ClassStatsProps {
  submissions: Submission[];
}

export const OverviewCarts = ({ submissions }: ClassStatsProps) => {
  const totalStudents = new Set(submissions.map((s) => s.studentName)).size;
  const averageScore =
    submissions.length > 0
      ? Math.round(
          submissions.reduce((sum, s) => sum + s.aiScore, 0) /
            submissions.length
        )
      : 0;

  const scoreDistribution = {
    excellent: submissions.filter((s) => s.aiScore >= 90).length,
    good: submissions.filter((s) => s.aiScore >= 80 && s.aiScore < 90).length,
    satisfactory: submissions.filter((s) => s.aiScore >= 70 && s.aiScore < 80)
      .length,
    needsWork: submissions.filter((s) => s.aiScore < 70).length,
  };

  return (
    <div>
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Сурагчийн тоо</p>
              <p className="text-3xl font-bold text-blue-600">
                {totalStudents}
              </p>
            </div>
            <Users className="h-12 w-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Илгээсэн даалгаврууд</p>
              <p className="text-3xl font-bold text-green-600">
                {submissions.length}
              </p>
            </div>
            <BarChart3 className="h-12 w-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Дундаж оноо</p>
              <p
                className={`text-3xl font-bold ${
                  averageScore >= 90
                    ? "text-green-600"
                    : averageScore >= 80
                    ? "text-blue-600"
                    : averageScore >= 70
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {averageScore}/100
              </p>
            </div>
            <TrendingUp className="h-12 w-12 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Шилдэг сурагчид</p>
              <p className="text-3xl font-bold text-yellow-600">
                {scoreDistribution.excellent}
              </p>
            </div>
            <Trophy className="h-12 w-12 text-yellow-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
