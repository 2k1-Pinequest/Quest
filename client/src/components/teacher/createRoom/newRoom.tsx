"use client";

import { useState } from "react";
import axios from "axios";

interface Props {
  teacherId: number;
  onCreated?: () => void;
}

const TeacherCreateRoom: React.FC<Props> = ({ teacherId, onCreated }) => {
  const [roomName, setRoomName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

 const handleCreate = async () => {
    if (!roomName.trim()) {
      setMessage("Хичээлийн нэр оруулах шаардлагатай");
      return;
    }
    setLoading(true);
    setMessage(null);

    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      await axios.post(
        `http://localhost:4200/room/${teacherId}`,
        { roomName },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }
      );

      setMessage("Хичээл амжилттай үүслээ!");
      setRoomName("");
      setTimeout(() => onCreated?.(), 1000);
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Хичээл үүсгэхэд алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-extrabold text-center text-gray-800 mb-6">
          Анги үүсгэх
        </h3>

        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-center text-sm font-medium ${
              message.includes("амжилттай")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <div className="space-y-5">
          <input
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Хичээлийн нэр"
            disabled={loading}
            className="w-full border px-4 py-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />

          <button
            onClick={handleCreate}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Үүсгэж байна..." : "Хичээл үүсгэх"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherCreateRoom;
