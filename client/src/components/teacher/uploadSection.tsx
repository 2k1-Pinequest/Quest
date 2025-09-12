import { Upload } from "lucide-react";

export default function UploadSection() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border max-w-2xl mx-auto">
      <div className="text-center">
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Upload Quiz File
        </h3>
        <p className="text-gray-600 mb-6">
          Upload a CSV or JSON file containing your quiz questions
        </p>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 
                        hover:border-purple-400 transition-colors">
          <input
            type="file"
            accept=".csv,.json"
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">
              Click to upload or drag and drop
            </span>
            <span className="text-xs text-gray-500 mt-1">
              CSV or JSON files only
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

