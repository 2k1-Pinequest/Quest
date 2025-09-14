"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

interface FormInputs {
  email: string;
  password: string;
}

interface TeacherLoginProps {
  onSuccess?: (teacherId: number, hasRoom: boolean) => void;
}

const TeacherLogin: React.FC<TeacherLoginProps> = ({ onSuccess }) => {
  const [message, setMessage] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const res = await axios.post("http://localhost:4200/teacher/sign-in", data, { withCredentials: true });
      localStorage.setItem("token", res.data.token);
      setMessage("Амжилттай нэвтэрлээ!");
      setTimeout(() => onSuccess?.(res.data.teacher.id, res.data.hasRoom), 1000);
      console.log(res)
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Нэвтрэхэд алдаа гарлаа");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Багш нэвтрэх</h2>

      {message && <div className={`mb-4 p-2 rounded ${message.includes("Амжилттай") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{message}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("email", { required: "И-мэйл оруулах шаардлагатай" })} type="email" placeholder="Email" className="w-full border px-3 py-2 rounded" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input {...register("password", { required: "Нууц үг оруулах шаардлагатай" })} type="password" placeholder="Нууц үг" className="w-full border px-3 py-2 rounded" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          {isSubmitting ? "Нэвтрэж байна..." : "Нэвтрэх"}
        </button>
        <p className="text-sm mt-2">
          Бүртгэлгүй юу?{" "}
          <a href="/teacherRoom/sign-up" className="text-blue-600">Энд дарж бүртгүүлнэ үү</a>
        </p>
      </form>
    </div>
  );
};

export default TeacherLogin;
