import { Submission } from "@/types";
import { AlertTriangle } from "lucide-react";

interface ClassStatsProps {
  submissions: Submission[];
}

export const Distribution = ({ submissions }: ClassStatsProps) => {
  
  const scoreDistribution = {
    excellent: submissions.filter((s) => s.aiScore >= 90).length,
    good: submissions.filter((s) => s.aiScore >= 80 && s.aiScore < 90).length,
    satisfactory: submissions.filter((s) => s.aiScore >= 70 && s.aiScore < 80)
      .length,
    needsWork: submissions.filter((s) => s.aiScore < 70).length,
  };

  const submissionsByType = {
    upload: submissions.filter((s) => s.type === "upload").length,
    text: submissions.filter((s) => s.type === "text").length,
  };

    const commonSuggestions = submissions
      .flatMap(s => s.aiSuggestions)
      .reduce((acc, suggestion) => {
        acc[suggestion] = (acc[suggestion] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    const topSuggestions = Object.entries(commonSuggestions)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Score Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
             Онооны хуваарилалт
          </h3>
          <div className="space-y-4">
            {[
              {
                label: "Их сайн (90-100)",
                count: scoreDistribution.excellent,
                color: "bg-green-500",
              },
              {
                label: "Сайн (80-89)",
                count: scoreDistribution.good,
                color: "bg-blue-500",
              },
              {
                label: "Дундаж (70-79)",
                count: scoreDistribution.satisfactory,
                color: "bg-yellow-500",
              },
              {
                label: "Сайжруулах шаардлагатай (<70)",
                count: scoreDistribution.needsWork,
                color: "bg-red-500",
              },
            ].map(({ label, count, color }) => (
              <div key={label} className="flex items-center">
                <div className="w-32 text-sm text-gray-600">{label}</div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-4">
                    <div
                      className={`${color} h-4 rounded-full transition-all duration-300`}
                      style={{
                        width: `${
                          submissions.length > 0
                            ? (count / submissions.length) * 100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="w-8 text-sm font-medium text-gray-800">
                  {count}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submission Types */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Илгээсэн хэлбэр
          </h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  📸
                </div>
                <div>
                  <p className="font-medium text-gray-800">Зураг</p>
                  <p className="text-sm text-gray-600">
                   OCR боловсруулсан
                  </p>
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {submissionsByType.upload}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  ✍️
                </div>
                <div>
                  <p className="font-medium text-gray-800">Текст</p>
                  <p className="text-sm text-gray-600">Онлайн оруулсан</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {submissionsByType.text}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Common Areas for Improvement */}
      {/* {topSuggestions.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <AlertTriangle className="h-6 w-6 mr-2 text-orange-500" />
             Хамгийн түгээмэл сайжруулах зүйлс
          </h3>
          <div className="space-y-3">
            {topSuggestions.map(([suggestion, count], index) => (
              <div key={suggestion} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center">
                  <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                    {index + 1}
                  </span>
                  <p className="text-gray-800">{suggestion}</p>
                </div>
                <span className="text-orange-600 font-medium">{count} сурагч</span>
              </div>
            ))}
          </div>
        </div>
      )} */}
    
    </div>
  );
};
