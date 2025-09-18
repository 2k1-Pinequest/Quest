import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function SubmissionCarousel() {
  return (
    <Carousel className="w-full max-w-xs relative">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="relative">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Сумнуудыг Carousel дээр байрлуулна */}
      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow rounded-full" />
      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow rounded-full" />
    </Carousel>
  );
}
