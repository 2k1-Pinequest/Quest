"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios, { AxiosError } from "axios";

interface FormInputs {
  email: string;
  password: string;
}

interface TeacherLoginProps {
  onSuccess?: (teacherId: number, hasRoom: boolean) => void;
}

const TeacherLogin: React.FC<TeacherLoginProps> = ({ onSuccess }) => {
  const [message, setMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/teacher/sign-in`,
        data,
        { withCredentials: true }
      );
      localStorage.setItem("token", res.data.token);
      setMessage("Амжилттай нэвтэрлээ!");
      setTimeout(() => onSuccess?.(res.data.teacher.id, res.data.hasRoom), 1000);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setMessage(error.response?.data?.message || "Нэвтрэхэд алдаа гарлаа");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Багш нэвтрэх
        </h2>

        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-center text-sm font-medium ${
              message.includes("Амжилттай")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              {...register("email", {
                required: "И-мэйл оруулах шаардлагатай",
              })}
              type="email"
              placeholder="И-мэйл"
              className="w-full border px-4 py-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("password", {
                required: "Нууц үг оруулах шаардлагатай",
              })}
              type="password"
              placeholder="Нууц үг"
              className="w-full border px-4 py-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Нэвтрэж байна..." : "Нэвтрэх"}
          </button>
        </form>

        <p className="text-sm text-center mt-5 text-gray-600">
          Бүртгэлгүй бол{" "}
          <a
            href="/teacherRoom/sign-up"
            className="text-blue-600 hover:underline font-medium"
          >
            энд дарж бүртгүүлнэ үү
          </a>
        </p>
      </div>
    </div>
  );
};

export default TeacherLogin;
