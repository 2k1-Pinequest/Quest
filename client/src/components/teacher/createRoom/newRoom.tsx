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
      setMessage("Ангины нэр оруулах шаардлагатай");
      return;
    }
    setLoading(true); setMessage(null);

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

      await axios.post(`http://localhost:4200/room/${teacherId}`, { roomName }, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
      });

      setMessage("Анги амжилттай үүслээ!");
      setRoomName("");
      setTimeout(() => onCreated?.(), 1000);
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Анги үүсгэхэд алдаа гарлаа");
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Анги үүсгэх</h3>
      {message && <div className={`mb-4 p-2 rounded ${message.includes("амжилттай") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{message}</div>}
      <input value={roomName} onChange={(e) => setRoomName(e.target.value)} placeholder="Ангины нэр" className="w-full border px-3 py-2 rounded mb-3" disabled={loading} />
      <button onClick={handleCreate} disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        {loading ? "Үүсгэж байна..." : "Анги үүсгэх"}
      </button>
    </div>
  );
};

export default TeacherCreateRoom;
