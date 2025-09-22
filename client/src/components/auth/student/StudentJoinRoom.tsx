"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoadingSpinner } from "@/components/ui/loadingSpinner";

export const StudentJoinRoomForm = () => {
  const router = useRouter();

  const [studentName, setStudentName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (!studentName || !roomCode) {
      setError("'Сурагчийн нэр' болон 'Ангийн код' шаардлагатай");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/room/studentJoin`,
        { studentName, roomCode }
      );

      localStorage.setItem("studentId", response.data.student.id);

      setMessage(response.data.message);
      setTimeout(() => {
        router.push("/studentRoom");
      }, 1000);
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      if (axiosError.response) {
        setError(axiosError.response.data.message);
      } else {
        setError("Сервертэй холбогдох үед алдаа гарлаа");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-6 border rounded-md bg-white shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Сурагч ангид нэгдэх
        </h2>

        <form onSubmit={handleJoinRoom} className="space-y-5">
          <div className="space-y-3">
            <Label htmlFor="studentName">Сурагчийн нэр</Label>
            <Input
              id="studentName"
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Таны нэр"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="roomCode">Ангийн код</Label>
            <Input
              id="roomCode"
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              placeholder="Багшаас өгсөн кодыг оруулна уу"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : "Ангид нэгдэх"}
          </Button>
        </form>

        <div className="mt-4 space-y-2">
          {message && (
            <Alert
              variant="default"
              className="border-green-500 bg-green-50 text-green-800"
            >
              <AlertTitle>Амжилттай</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Алдаа</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};
