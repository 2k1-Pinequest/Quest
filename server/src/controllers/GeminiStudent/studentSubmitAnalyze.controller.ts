import { Request, Response } from "express";
import fs from "fs";
import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import prisma from "../../utils/prisma";

import axios from "axios";

import cloudinary from "../../utils/cloudinary";

// types/assignmentAnalysis.ts
export interface AssignmentAnalysis {
  totalTasks: number;
  correctTasks: number;
  score: number;
  summary: string;
  mistakes: string[];
  uncertain: string[];
  suggestions: string[];
  overall: string;
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

async function urlToGenerativePart(
  url: string,
  mimeType: string
): Promise<Part> {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  const base64 = Buffer.from(response.data).toString("base64");
  return {
    inlineData: {
      data: base64,
      mimeType,
    },
  };
}

export const analyzeAssignment = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const { assignmentId } = req.body;

    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(400).json({ error: "Зураг upload хийгдээгүй байна" });
    }

    const files = req.files as Express.Multer.File[];

    // --- DB-d hadagalah suragchiin daalgawar (submission) ---
    // Cloudinary ruu upload hiine
    const uploadedUrls: string[] = [];

    for (const f of files) {
      const result = await cloudinary.uploader.upload(f.path, {
        folder: "assignments", // Cloudinary "assignments" folder-r uuseneee
      });
      uploadedUrls.push(result.secure_url);
      // local deer hadgalsan file-g ustganaa
      fs.unlinkSync(f.path);
    }

    console.log("uploadedUrls", uploadedUrls);

    // DB-d zuwhun cloudanry url hadaglagdan
    const submission = await prisma.studentSubmission.create({
      data: {
        studentId: Number(studentId),
        assignmentId: Number(assignmentId),
        fileUrl: uploadedUrls.join(","),
        status: "PENDING",
      },
    });

    console.log("submission", submission);

    // return res.json({ submission });

    res.json({
      success: true,
      submission,
    });

    // --- AI nalyze async-r ajiluulan ---
    (async () => {
      try {
        console.log("ai analyze starteddd");

        console.log("uploadedUrls", uploadedUrls);

        const parts = await Promise.all(
          uploadedUrls.map((url) => urlToGenerativePart(url, "image/png"))
        );

        // console.log("partssss", parts);

        const model = genAI.getGenerativeModel({
          model: "gemini-2.5-flash",
          generationConfig: {
            temperature: 0,
            topP: 1,
            topK: 1,
          },
        });

        const prompt = `
Чи зөвхөн JSON буцаа. Markdown, текст, тайлбар битгий оруул.
Чи зөвхөн сурагчийн бодлого бүрийн үнэн зөв байдлаар дүн гаргана.
Сурагчийн бичсэн оноо, тайлбарыг тоохгүй.

**[НЭМЭЛТ ЗААВАР: ХАМГИЙН ЧУХАЛ]**

"Хэрэв OCR-аас гарсан тоо, тэмдэгт, үсэг уншихад эргэлзээтэй (жишээ нь 3 эсвэл 5, + эсвэл −, x эсвэл * гэх мэт ялгахад бэрх) байвал тухайн бодлогыг үнэлэхгүй, зөвхөн 'uncertain' хэсэгт оруул."

**[НЭМЭЛТ ЗААВАР: ХАМГИЙН ЧУХАЛ - ЭРГЭЛЗЭЭТЭЙ ХЭСЭГ]**
1.  **ЭХЛЭЭД ВИЗУАЛ ШАЛГАЛТ ХИЙ**: Чи эхлээд бүх тоо, тэмдэгтүүдийг анхааралтай хараад, **гар бичмэлийн чанарыг** дүгнэ.
2.  Хэрэв тухайн бодлогын **тоо, тэмдэгт (жишээ нь: 3-ыг 5, эсвэл +-ийг х-ээр андуурах магадлалтай)** уншигдах байдал нь **ТӨВӨГТЭЙ, БҮДЭГ, ЭРГЭЛЗЭЭТЭЙ** байвал, түүнийг **бодолт зөв эсвэл буруу эсэхээс үл хамааран** **ЗААВАЛ "uncertain"** хэсэгт оруул.
3.  Хэрэв чи тухайн бодлогын тоог **өөрийнхөө уншсанаар** бодоход алдаа гарч, гэхдээ тэр тоо нь өөр байх магадлалтай гэж үзвэл мөн "uncertain" хэсэгт оруул.
4.  **ХАРИУЛТЫН ТОВЧЛОЛ**: "uncertain" хэсгийн тайлбар нь **ЗӨВХӨН ҮНДСЭН АСУУДЛЫГ** нэрлэсэн, **МАШ БОГИНО**, нэг өгүүлбэр байх ёстой. Учир шалтгаан, бодолтын логик зөрчлийг дэлгэрэнгүй бичихгүй.

**[НЭМЭЛТ ЗААВАР: БОДЛОГЫГ ХЭРХЭН ТОДОРХОЙЛОХ]**
1.  **"totalTasks"**-ийг тодорхойлохдоо:
    * **Зөвхөн бие даасан бодлого/асуулт** бүрийг тооц. 
    * Нэг бодлогын хариу олон зурагт давхар орсон байсан ч нэг л бодлого гэж тооцно.
    * Зураг олон байгаа нь бодлогын тоог өсгөх үндэслэл болохгүй.
2.  **Завсрын алхам, тооцоолол, эсвэл үргэлжлэл**-ийг даалгаварт тооцохгүй.
3.  **Нэг бодлого олон мөрөөр бичигдсэн байвал** мөн нэг л бодлого гэж тооц.

**[НЭМЭЛТ ЗААВАР: ALDAA-ийг ТОДОРХОЙЛОХ]**
1. Mistakes жагсаалтад зөвхөн "Коэффициент алдаа" гэх мэт ерөнхий мэдээлэл биш, ямар бодлого, ямар тоо/илэрхийлэл буруу байсан, хэдэн оноо алдсан зэрэг мэдээллийг тодорхой бич.
2. Формат: "Бодлого X: ([алдаатай илэрхийлэл]) - буруу бодсон, [алдаа төрөл], [тус бодлогоос алдсан оноо] он."
3. Хэрвээ бодлогын алдааг зөв тодорхойлох боломжгүй бол тухайн бодлогыг "uncertain" хэсэгт оруул.

**[НЭМЭЛТ ЗААВАР: АЛДААГ ҮЛДЭЭХГҮЙ БАЙХ ТУШААЛ]**
1.  **ҮНДСЭН ДҮРЭМ**: Хэрэв **correctTasks** ≠ **totalTasks**, заавал Mistakes жагсаалтад бодлого бүрийг бич.
2.  **Алдаа тодорхойгүй бол** uncertain руу оруул.

**[НЭМЭЛТ ЗААВАР: ТООНЫ НЭГДСЭН ШАЛГАЛТ]**
1. "totalTasks" = correctTasks + mistakes.length + uncertain.length байх ёстой.
2. "score" = (correctTasks / totalTasks) * 100, бүхэл тоо.
3. "uncertain" хоосон бол заавал ["Эргэлзээ байхгүй"] гэж бөглө.
4. "overall": Хэрэв uncertain-д ямар нэг бодлого байвал "Дахин шалгах хэрэгтэй", үгүй бол "Бүгд тодорхой".

JSON бүтэц:
{
  "totalTasks": number,
  "correctTasks": number,
  "score": number,
  "summary": string,
  "mistakes": [string],
  "uncertain": [string],
  "suggestions": [string],
  "overall": string
}
`;

        const result = await model.generateContent([prompt, ...parts]);

        let cleanOutput = (await result.response.text()).trim();
        cleanOutput = cleanOutput
          .replace(/^```json\s*/, "")
          .replace(/^```\s*/, "")
          .replace(/\s*```$/, "");

        let parsed: AssignmentAnalysis;
        // try {
        //   parsed = JSON.parse(cleanOutput);
        // } catch (e) {
        //   console.error("AI JSON parse алдаа:", cleanOutput);
        //   return;
        // }

        try {
          parsed = JSON.parse(cleanOutput) as AssignmentAnalysis;
          parsed.mistakes = Array.isArray(parsed.mistakes)
            ? parsed.mistakes
            : [parsed.mistakes];
          parsed.uncertain = Array.isArray(parsed.uncertain)
            ? parsed.uncertain
            : [parsed.uncertain];
          parsed.suggestions = Array.isArray(parsed.suggestions)
            ? parsed.suggestions
            : [parsed.suggestions];
        } catch (e) {
          console.error("AI JSON parse алдаа:", cleanOutput);
          return;
        }

        console.log("parsedddd", parsed);

        const aiStident = await prisma.studentAssignmentAi.upsert({
          where: {
            studentId_assignmentId: {
              studentId: Number(studentId),
              assignmentId: Number(assignmentId),
            },
          },
          update: {
            score: parsed.score,
            summary: parsed.summary,
            mistakes: parsed.mistakes,
            suggestions: parsed.suggestions,
            overall: parsed.overall,
          },
          create: {
            studentId: Number(studentId),
            assignmentId: Number(assignmentId),
            score: parsed.score,
            summary: parsed.summary,
            mistakes: parsed.mistakes,
            suggestions: parsed.suggestions,
            overall: parsed.overall,
          },
        });

        // console.log("AI analysis saved for:", aiStident);

        // --- Temporary files устгах ---
        // files.forEach((f) => {
        //   fs.unlink(f.path, (err) => {
        //     if (err) console.error("File delete error:", err);
        //   });
        // });
      } catch (aiErr) {
        console.error("AI анализ алдаа:", aiErr);
      }
    })();
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      error: "API дуудлага хийхэд алдаа гарлаа: " + err.message,
    });
  }
};
