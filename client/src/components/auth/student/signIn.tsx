"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, UserRoundPlusIcon } from "lucide-react";

interface FormInputs {
  email: string;
  password: string;
}

interface StudentLoginProps {
  onSuccess?: () => void;
}

const StudentLogin: React.FC<StudentLoginProps> = ({ onSuccess }) => {
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<FormInputs>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/student/login`,
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 items-center justify-center px-4 flex flex-col">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <UserRoundPlusIcon className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-green-500 mb-2">Нэвтрэх</h1>
      </div>
      <Card className="w-full max-w-md shadow-lg">
        <CardContent>
          {message && (
            <div
              className={`mb-4 p-2 rounded text-sm ${
                message.includes("Амжилттай")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                rules={{ required: "И-мэйл оруулах шаардлагатай" }}
                render={({ field }) => (
                  <FormItem>
                    <Label>И-мэйл</Label>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="өөрийн и-мэйл ээ оруулаарай"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                rules={{ required: "Нууц үг оруулах шаардлагатай" }}
                render={({ field }) => (
                  <FormItem>
                    <Label>Нууц үг</Label>
                    <FormControl>
                      <Input type="password" placeholder="нууц үг" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-500 text-white rounded-lg py-2"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {form.formState.isSubmitting ? "Нэвтэрж байна..." : "Нэвтрэх"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm mt-2">
            Бүртгэлгүй бол{" "}
            <a href="/studentRoom/signUp" className="text-blue-600">
              Энд дарж бүртгүүлнэ үү
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StudentLogin;
