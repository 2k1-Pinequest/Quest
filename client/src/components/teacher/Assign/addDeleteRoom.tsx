import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";

interface AddClassProps {
  addClassroom: (roomName: string) => void; // parent function-д нэр дамжуулах
}

export function AddClass({ addClassroom }: AddClassProps) {
  const [addClass, setAddClass] = useState("");

  // const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault(); // page reload зогсоох
  //   if (!addClass.trim()) return;
  //   addClassroom(addClass.trim());
  //   setAddClass(""); // input-г цэвэрлэх
  // };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="bg-blue-500 text-white hover:text-black"
        >
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!addClass.trim()) return;
            addClassroom(addClass.trim());
            setAddClass(""); // input-г цэвэрлэх
          }}
        >
          <DialogHeader>
            <DialogTitle>Анги нэмэх</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 p-4">
            <Input
              id="name-1"
              name="name"
              placeholder="Ангийн нэр"
              value={addClass}
              onChange={(e) => setAddClass(e.target.value)}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            {/* Save товч дарсны дараа dialog хаагдах */}
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
