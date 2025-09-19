"use client";

import { useState } from "react";
import { format, isBefore, startOfDay } from "date-fns";
import axios, { AxiosError } from "axios";

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
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TeacherAssignmentFormProps {
  teacherId: number;
  roomId: number;
  onAssignmentCreated?: (assignment: any) => void;
  disabled?: boolean;
}

export function TeacherAssignmentForm({
  teacherId,
  roomId,
  
  onAssignmentCreated,
}: TeacherAssignmentFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [textContent, setTextContent] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        teacherId,
        roomId,
        title,
        description,
        textContent,
        dueDate: dueDate?.toISOString(),
      };

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/teacher/createAssignment`,
        payload
      );
      console.log(data);
      alert("Даалгавар амжилттай үүслээ!");

      if (onAssignmentCreated) {
        onAssignmentCreated(data.assignment || data);
      }

      setTitle("");
      setDescription("");
      setTextContent("");
      setDueDate(undefined);

      setOpen(false);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      alert("Алдаа: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <CirclePlus />
          <span>Даалгавар үүсгэх</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Шинэ гэрийн даалгавар
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4 mt-2" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label>Даалгаврын гарчиг</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Жишээ: Математик №1"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Тайлбар</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="placeholder:text-sm placeholder:text-gray-400"
              placeholder="Тайлбар..."
              rows={3}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Даалгаврын текст</label>
            <Textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="Даалгаврын текстээ энд бичнэ үү..."
              rows={5}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Дуусах хугацаа</label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "yyyy/MM/dd") : "Огноо сонгох"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={(date) => {
                    if (
                      date &&
                      isBefore(startOfDay(date), startOfDay(new Date()))
                    ) {
                      return;
                    }
                    setDueDate(date || undefined);
                    setCalendarOpen(false);
                  }}
                  fromDate={new Date()}
                  disabled={(date) =>
                    isBefore(startOfDay(date), startOfDay(new Date()))
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setTitle("");
                setDescription("");
                setTextContent("");
                setDueDate(undefined);
                setOpen(false);
              }}
            >
              Болих
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? "Түр хүлээнэ үү..." : "Хадгалах"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
