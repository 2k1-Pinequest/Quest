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
import { Plus } from "lucide-react";
import { useState } from "react";

interface AddClassProps {
  addClassroom: (roomName: string) => void; 
}

export function AddClass({ addClassroom }: AddClassProps) {
  const [addClass, setAddClass] = useState("");
   const [open, setOpen] = useState(false);

   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addClass.trim()) return;
    addClassroom(addClass.trim());
    setAddClass("");
    setOpen(false); 
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} >
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
              <Button variant="outline">Гарах</Button>
            </DialogClose>

            <DialogClose asChild>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 text-sm font-medium ">Хадгалах</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
