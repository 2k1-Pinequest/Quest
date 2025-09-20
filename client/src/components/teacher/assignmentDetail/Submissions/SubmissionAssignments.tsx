import React, { useState, useEffect } from "react";

import { dummySubmissions } from "@/components/data/dummyData";
import { Submission } from "@/types";
import { SubmissionCarousel } from "./SubmissionCarousel";
import { GurvanUildel } from "./GurvanUildel";

import TitleAndDescription from "./GarchigDelgerengui";
import { Skeleton } from "@/components/ui/skeleton";

interface TitleAndDescriptionProps {
  title: string;
  description: string;
}

export const SubmissionsAssignments: React.FC<TitleAndDescriptionProps> = ({
  title,
  description,
}) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  // Dummy data-г 1.5 секундийн дараа ачаална гэж үзнэ
  useEffect(() => {
    const timer = setTimeout(() => {
      setSubmissions(dummySubmissions);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

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
          <h1>Дуусах хугацаа</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-10 pt-5">
          {/* Илгээсэн даалгавар */}
          <div className="flex flex-col items-center gap-3 w-full md:w-1/2">
            <h1>Илгээсэн даалгавар</h1>
            {loading ? (
              <div className="flex gap-3 overflow-x-auto animate-pulse w-full">
               
                  <Skeleton className="w-full h-90 rounded-lg" />
                
              </div>
            ) : (
              <SubmissionCarousel/>
            )}
          </div>

          <div className="border hidden md:block"></div>

          {/* AI analyze */}
          <div className="flex flex-col gap-3 w-full md:w-1/2">
            <h1>AI analyze</h1>
            {loading ? (
              <div className="space-y-2 animate-pulse w-full">
                <Skeleton className="h-6 w-3/4 rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-5/6 rounded" />
              </div>
            ) : (
              <p>
                Оюутан рационал тоог аравтын бутархай болон энгийн бутархай
                хэлбэрт хөрвүүлэх, мөн давтагдах аравтын бутархайг таних,
                хөрвүүлэх чадвараа сайн харуулсан. Гэсэн хэдий ч тоон шугам дээр
                цэг тэмдэглэх, зарим тоог хөрвүүлэхдээ алдаа гаргасан байна.
              </p>
            )}
          </div>
        </div>
          <GurvanUildel />
      </div>
    </div>
  );
};
