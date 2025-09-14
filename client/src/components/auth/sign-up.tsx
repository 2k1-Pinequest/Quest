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
    <div className="max-w-md mx-auto p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Багшийн бүртгэл</h2>

      {message && (
        <div className={`mb-4 p-2 rounded ${message.includes("Амжилттай") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("name", { required: "Нэр оруулах шаардлагатай" })} placeholder="Нэр" className="w-full border px-3 py-2 rounded" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        <input {...register("email", { required: "И-мэйл оруулах шаардлагатай", pattern: { value: /\S+@\S+\.\S+/, message: "И-мэйл буруу байна" } })} type="email" placeholder="Email" className="w-full border px-3 py-2 rounded" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input {...register("password", { required: "Нууц үг оруулах шаардлагатай", pattern: { value: passwordPattern, message: "Нууц үг 8+ тэмдэгт, том жижиг үсэг болон тоо агуулсан байх ёстой" } })} type="password" placeholder="Нууц үг" className="w-full border px-3 py-2 rounded" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          {isSubmitting ? "Бүртгэж байна..." : "Бүртгүүлэх"}
        </button>
         <p className="text-sm mt-2">
          Бүртгэлтэй бол{" "}
          <a href="/teacherRoom/sign-in" className="text-blue-600">Энд дарж нэвтэрнэ үү</a>
        </p>
      </form>
    </div>
  );
};

export default TeacherSignup;
