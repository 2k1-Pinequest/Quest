"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextareaAutosize from "react-textarea-autosize";

interface Assignment {
  id: string;
  roomId: string;
  title: string;
  instruction: string;
  createdAt: string;
}

interface JwtPayload {
  id: string;
  studentName: string;
}

export default function Student({ assignment }: { assignment: Assignment }) {
  const [studentData, setStudentData] = useState<{
    studentName: string;
    roomCode: string;
  } | null>(null);
  const [textContent, setTextContent] = useState("");
  const [teacherQuestion, setTeacherQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setStudentData({
          studentName: decoded.studentName,
          roomCode: "9A",
        });
      } catch (e) {
        console.error("Token decode error:", e);
      }
    } else {
      setStudentData({
        studentName: "Тест Сурагч",
        roomCode: "9A",
      });
    }
  }, []);

  const handleSubmit = () => {
    if (!textContent.trim()) return;
    console.log("Даалгавар:", textContent);
    console.log("Асуулт багшид:", teacherQuestion);
    setSubmitted(true);
    setTimeout(() => {
      setTextContent("");
      setTeacherQuestion("");
      setSubmitted(false);
    }, 3000);
  };

  if (!studentData) return <div>Ачааллаж байна...</div>;

  return (
    <div className="min-h-screen p-4 relative">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl  text-gray-900">
                Сайн байна уу, {studentData.studentName}!
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-medium">Ангийн код:</span>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {studentData.roomCode}
              </Badge>
            </div>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-blue-600" /> заавар
              {assignment.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-600">
              <li>• Даалгавраа зөв, тодорхой хариулна уу</li>
              <li>• Зураг тодорхой, уншиж болохуйц байх ёстой</li>
              <li>• AI системээс анхны үнэлгээ авах болно</li>
              <li>• Багш эцсийн үнэлгээ өгөх болно</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Даалгавар илгээх</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="text" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Бичвэр
                </TabsTrigger>
                <TabsTrigger value="image" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" /> Зураг
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text">
                <Label htmlFor="textContent">Даалгаврын хариулт</Label>
                <TextareaAutosize
                  id="textContent"
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder="Даалгаврын хариултаа энд бичнэ үү..."
                  minRows={6}
                  className="mt-1 w-full border rounded p-2 resize-none"
                />
              </TabsContent>

              <TabsContent value="image">
                <Label htmlFor="imageUpload">Зураг сонгох</Label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-600">
                    Зураг сонгох эсвэл энд тавина уу
                  </p>
                  <Input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    className="mt-3"
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div>
              <Label htmlFor="teacherQuestion">
                Багшаас асуух асуулт (optional)
              </Label>
              <TextareaAutosize
                id="teacherQuestion"
                value={teacherQuestion}
                onChange={(e) => setTeacherQuestion(e.target.value)}
                placeholder="Багшаас асуух асуултаа энд бичнэ үү..."
                minRows={2}
                className="mt-1 w-full border rounded p-2 resize-none"
              />
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
              disabled={!textContent.trim()}
            >
              Даалгавар илгээх
            </Button>

            {submitted && (
              <div className="mt-4 border-2 border-blue-500 rounded-lg p-4 bg-blue-50">
                <p className="font-medium text-blue-800 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  Амжилттай илгээгдлээ ✅
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  Багш таны даалгаврыг шалгаж, үнэлгээ өгөх болно.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
