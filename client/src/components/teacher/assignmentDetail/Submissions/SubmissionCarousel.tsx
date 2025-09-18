"use client";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function SubmissionCarousel() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Carousel className="w-full max-w-xs relative">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="relative">
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <img
                      src="https://i.pinimg.com/736x/0c/6c/c4/0c6cc4aeb416de7b004e1f4cea45a26f.jpg"
                      alt="hicheeliin zurag"
                      onClick={() => {
                        setOpen(true);
                      }}
                    />
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogTitle>Сурагчийн гэрийн даалгавар</DialogTitle>

          <Carousel className="w-full relative">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="relative">
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <img
                          src="https://i.pinimg.com/736x/0c/6c/c4/0c6cc4aeb416de7b004e1f4cea45a26f.jpg"
                          alt="hicheeliin zurag"
                          onClick={() => {
                            setOpen(true);
                          }}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow rounded-full" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow rounded-full" />
          </Carousel>
        </DialogContent>
      </Dialog>
    </div>
  );
}
