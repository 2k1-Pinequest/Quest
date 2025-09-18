import { Submission } from "@/types";

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

  const commonSuggestions = submissions
    .flatMap((s) => s.aiSuggestions)
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
        {/* Хамгийн нийтлэг AI зөвлөмжүүд */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Сурагчдаас ирж буй асуултууд
          </h3>
          {topSuggestions.length > 0 ? (
            <ul className="space-y-2">
              {topSuggestions.map(([suggestion, count]) => (
                <li
                  key={suggestion}
                  className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg"
                >
                  <span className="text-sm text-gray-700">{suggestion}</span>
                  <span className="text-sm font-semibold text-blue-600">
                    {count}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">Одоогоор зөвлөмж алга.</p>
          )}
        </div>
      </div>
    </div>
  );
};
