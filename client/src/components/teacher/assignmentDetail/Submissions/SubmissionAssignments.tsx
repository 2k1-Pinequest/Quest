import React, { useState } from "react";

import { dummySubmissions } from "@/components/data/dummyData";
import { Submission } from "@/types";
import { SubmissionCarousel } from "./SubmissionCarousel";
import { GurvanUildel } from "./GurvanUildel";

import TitleAndDescription from "./GarchigDelgerengui";

interface TitleAndDescriptionProps {
  title: string;
  description: string;
}
type FilterType = "all" | "suggested-approve" | "suggested-review" | "approved";

export const SubmissionsAssignments: React.FC<TitleAndDescriptionProps> = ({
  title,
  description,
}) => {
  console.log("Title:", title);
  console.log("Description:", description);

  const [submissions, setSubmissions] =
    useState<Submission[]>(dummySubmissions);
  const [filter, setFilter] = useState<FilterType>("all");

  const bulkApproveAISuggestions = () => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.aiSuggestions[0] === "approve" &&
        s.teacherReview?.status === "pending"
          ? { ...s, teacherReview: { ...s.teacherReview, status: "approved" } }
          : s
      )
    );
  };

  return (
    <div>
      <TitleAndDescription title={title} description={description} />
      <div className="rounded-2xl w-full border p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Сурагчийн нэр</h2>
          <h1>Дуусах хугацааа</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-10 pt-5">
          <div className="flex flex-col items-center gap-3">
            <h1>Илгээсэн даалгавар</h1>
            <SubmissionCarousel />
          </div>
          <div className="border"></div>
          <div className="flex flex-col gap-3">
            <h1> AI analyze</h1>
            <h1>
              Оюутан рационал тоог аравтын бутархай болон энгийн бутархай
              хэлбэрт хөрвүүлэх, мөн давтагдах аравтын бутархайг таних,
              хөрвүүлэх чадвараа сайн харуулсан. Гэсэн хэдий ч тоон шугам дээр
              цэг тэмдэглэх, зарим тоог хөрвүүлэхдээ алдаа гаргасан байна.
            </h1>
          </div>
        </div>
        <GurvanUildel />

        {/* <SubmissionsTable
        submissions={submissions}
        setSubmissions={setSubmissions}
        filter={filter}
      /> */}
      </div>
    </div>
  );
};
