export const getScoreColor = (score: number) => {
  if (score >= 90) return "text-green-600";
  if (score >= 80) return "text-blue-600";
  if (score >= 70) return "text-yellow-600";
  return "text-red-600";
};

export const formatInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
};
