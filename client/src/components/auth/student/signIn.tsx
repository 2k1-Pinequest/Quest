"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios, { AxiosError } from "axios";

interface FormInputs {
  email: string;
  password: string;
}

interface StudentLoginProps {
  onSuccess?: () => void;
}

const StudentLogin: React.FC<StudentLoginProps> = ({ onSuccess }) => {
  const [message, setMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:4200/student/login",
        data,
        { withCredentials: true }
      );
      localStorage.setItem("token", res.data.token);
      setMessage("Амжилттай нэвтэрлээ!");

      setTimeout(() => onSuccess?.(), 1000);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setMessage(error.response?.data?.message || "Нэвтрэхэд алдаа гарлаа");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Сурагч нэвтрэх</h2>

      {message && (
        <div
          className={`mb-4 p-2 rounded ${
            message.includes("Амжилттай")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">И-мэйл</label>
          <input
            {...register("email", { required: "И-мэйл оруулах шаардлагатай" })}
            type="email"
            className="w-full border px-3 py-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Нууц үг</label>
          <input
            {...register("password", {
              required: "Нууц үг оруулах шаардлагатай",
            })}
            type="password"
            className="w-full border px-3 py-2 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isSubmitting ? "Нэвтрэж байна..." : "Нэвтрэх"}
        </button>

        <p className="text-sm mt-2">
          Бүртгэлгүй юу?{" "}
          <a href="/studentRoom/signUp" className="text-blue-600">
            Энд дарж бүртгүүлнэ үү
          </a>
        </p>
      </form>
    </div>
  );
};

export default StudentLogin;
