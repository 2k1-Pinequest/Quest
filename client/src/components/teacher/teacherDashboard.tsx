import { BookOpen, CirclePlus } from "lucide-react";
import { TeacherClassRoomHeader } from "./teacherClassroomHeader";
import { TeacherAssignmentForm } from "./teacheAssignmentForm";

export const TeacherClassRooms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <TeacherClassRoomHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* angiud songogoh navbar heseg hu */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-users mr-2"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                My Classrooms
              </h3>

              <div className="space-y-2">
                <button className="w-full text-left p-3 rounded-xl transition-colors bg-blue-100 text-blue-700 border-2 border-blue-200">
                  <div className="font-semibold">10a</div>
                  <div className="text-sm text-gray-500">VS29R5</div>
                </button>
              </div>
            </div>
          </div>

          {/* angiin daalgawaruud*/}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* angiin ner add assign button*/}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">10A</h2>
                  <p className="text-gray-600">
                    Ангийн код
                    <span className="font-mono font-semibold"> VS29R5</span>
                  </p>
                </div>

                <TeacherAssignmentForm />

              </div>
            </div>

            {/* neg shirheg daalgawar orood harhaar huuhed bolgonii submission haragdana*/}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">

                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Initial Assignment
                    </h3>
                    <p className="text-gray-600 mt-1">Daalgawar 1</p>
                  </div>

                  <div className="text-sm text-gray-500">0 submission(s)</div>
                </div>

                <div className="space-y-4">
                  <div className="text-center py-8 text-gray-500 flex flex-col justify-center items-center">
                    {" "}

                    <BookOpen className="h-15 w-15"/>
                    No submissions yet
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
