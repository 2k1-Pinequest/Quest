import { Submission } from "@/types";
import { Distribution } from "./distribution";
import { OverviewCarts } from "./overviewCarts";

interface ClassStatsProps {
  submissions: Submission[];
}

export const StatsTab = ({ submissions }: ClassStatsProps) => {
  return (
    <div className="flex flex-col gap-6">
      <OverviewCarts submissions={submissions} />
      <Distribution submissions={submissions} />
    </div>
  );
};
