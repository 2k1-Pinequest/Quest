"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

interface FormInputs {
  name: string;
  email: string;
  password: string;
}

interface TeacherSignupProps {
  onSuccess?: () => void;
}

const TeacherSignup: React.FC<TeacherSignupProps> = ({ onSuccess }) => {
  const [message, setMessage] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormInputs>();

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      await axios.post("http://localhost:4200/teacher/sign-up", data, { withCredentials: true });
      setMessage("Амжилттай бүртгэгдлээ! Одоо нэвтрэх боломжтой.");
      setTimeout(() => onSuccess?.(), 1500);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Бүртгэл хийхэд алдаа гарлаа");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Багшийн бүртгэл
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
              {...register("name", { required: "Нэр оруулах шаардлагатай" })}
              placeholder="Нэр"
              className="w-full border px-4 py-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <input
              {...register("email", {
                required: "И-мэйл оруулах шаардлагатай",
                pattern: { value: /\S+@\S+\.\S+/, message: "И-мэйл буруу байна" },
              })}
              type="email"
              placeholder="И-мэйл"
              className="w-full border px-4 py-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              {...register("password", {
                required: "Нууц үг оруулах шаардлагатай",
                pattern: {
                  value: passwordPattern,
                  message: "Нууц үг 8+ тэмдэгт, том жижиг үсэг болон тоо агуулсан байх ёстой",
                },
              })}
              type="password"
              placeholder="Нууц үг"
              className="w-full border px-4 py-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Бүртгэж байна..." : "Бүртгүүлэх"}
          </button>
        </form>

        <p className="text-sm text-center mt-5 text-gray-600">
          Бүртгэлтэй бол{" "}
          <a href="/teacherRoom/sign-in" className="text-blue-600 hover:underline font-medium">
            энд дарж нэвтэрнэ үү
          </a>
        </p>
      </div>
    </div>
  );
};

export default TeacherSignup;
