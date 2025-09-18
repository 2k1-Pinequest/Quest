import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Submission } from "@/types";
import { ChartLine, NotebookText, Users } from "lucide-react";

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

  return (
    <Card className="rounded-2xl shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Ангийн статистик
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="flex items-center justify-between  rounded-xl p-4">
            <div>
              <p className="text-gray-600 text-sm">Сурагчийн тоо</p>
              <div className="flex gap-4">
                <Users className="h-8 w-8 text-blue-500" />
                <p className="text-3xl font-bold text-blue-600">
                  {totalStudents}
                </p>
              </div>
            </div>
          </div>

          {/* Илгээсэн даалгавар */}
          <div className="flex items-center justify-between  rounded-xl p-4">
            <div>
              <p className="text-gray-600 text-sm">Илгээсэн даалгавар</p>
              <div className="flex gap-4">
                <NotebookText className="h-8 w-8 text-blue-500" />
                <p className="text-3xl font-bold text-blue-600">
                  {submissions.length}
                </p>
              </div>
            </div>
          </div>

          {/* Дундаж оноо */}
          <div className="flex items-center justify-between  rounded-xl p-4">
            <div>
              <p className="text-gray-600 text-sm">Дундаж оноо</p>
              <div className="flex gap-4">
                <ChartLine className="h-8 w-8 text-blue-500" />
                <p
                  className={`text-3xl font-bold ${
                    averageScore >= 90
                      ? "text-blue-600"
                      : averageScore >= 70
                      ? "text-blue-600"
                      : "text-blue-600"
                  }`}
                >
                  {averageScore}/100
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
