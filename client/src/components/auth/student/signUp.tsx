"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserRoundPlusIcon } from "lucide-react";

interface StudentSignupProps {
  onSuccess?: () => void;
}

const formSchema = z.object({
  studentName: z.string().min(1, "Нэр оруулах шаардлагатай"),
  email: z.string().email("И-мэйл буруу байна"),
  password: z
    .string()
    .length(4, "Нууц үг 4 оронтой байх ёстой")
    .regex(/^\d{4}$/, "Нууц үг зөвхөн 4 оронтой тоо байх ёстой"),
});

type FormInputs = z.infer<typeof formSchema>;

const StudentSignup: React.FC<StudentSignupProps> = ({ onSuccess }) => {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormInputs) => {
    try {
      await axios.post("http://localhost:4200/student/register", data, {
        withCredentials: true,
      });
      setMessage("Амжилттай бүртгэгдлээ! Одоо join class руу шилжиж байна.");

      setTimeout(() => {
        router.push("/studentRoom/joinclass");
      }, 1000);
      onSuccess?.();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setMessage(
        error.response?.data?.message || "Бүртгэл хийхэд алдаа гарлаа"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100  items-center justify-center px-4 flex flex-col">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <UserRoundPlusIcon className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-green-500 mb-2">
          Сурагчийн бүртгэл
        </h1>
        <p>Доорх формыг бөглөж бүртгэлээ үүсгэнэ үү</p>
      </div>
      <Card className="w-full max-w-md shadow-lg">
        <CardContent>
          {message && (
            <Alert
              className={`mb-4 ${
                message.includes("Амжилттай")
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="studentName"
                render={({ field }) => (
                  <FormItem>
                    <Label>Нэр</Label>
                    <FormControl>
                      <Input placeholder="Сурагчийн нэр" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
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
                {form.formState.isSubmitting
                  ? "Бүртгэж байна..."
                  : "Бүртгүүлэх"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm mt-2">
            Бүртгэлтэй бол{" "}
            <a href="/studentRoom" className="text-blue-600">
              Энд дарж нэвтэрнэ үү
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StudentSignup;
