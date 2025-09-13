"use client";

import { useState } from "react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, CirclePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function TeacherAssignmentForm() {
  // ✅ form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const assignmentData = {
      title,
      description,
      file,
      dueDate,
    };

    console.log("Submitted assignment:", assignmentData);

    // TODO: энд API руу POST хийх код нэмнэ
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2">
          <CirclePlus />
          <span>Add Assignment</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Шинэ гэрийн даалгавар
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4 mt-2" onSubmit={handleSubmit}>
          {/* Даалгаврын гарчиг */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Даалгаврын гарчиг
            </label>
            <Input
              placeholder="Жишээ: Математик хичээл №1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Тайлбар */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Тайлбар
            </label>
            <Textarea
              placeholder="Даалгаврын дэлгэрэнгүй тайлбар бичнэ үү..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Хавсаргах файл */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Файл хавсаргах
            </label>
            <Input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          {/* Дуусах хугацаа */}
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-700">
              Дуусах хугацаа
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "yyyy/MM/dd") : "Огноо сонгох"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Submit button */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                // Болих товч дарвал state-уудыг цэвэрлэж болно
                setTitle("");
                setDescription("");
                setFile(null);
                setDueDate(undefined);
              }}
            >
              Болих
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Хадгалах
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
