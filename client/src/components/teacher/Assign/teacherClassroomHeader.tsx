import { ArrowLeft} from "lucide-react";
import { useRouter } from "next/navigation";

export const TeacherClassRoomHeader = () => {
  const router = useRouter();

  return (
    <header>
      <div className="max-w-7xl mx-auto ">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push(`/`)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft />
            </button>
            <h1 className=" text-gray-400">Нүүр хуудас</h1>
          </div>
        </div>
      </div>
    </header>
  );
};
