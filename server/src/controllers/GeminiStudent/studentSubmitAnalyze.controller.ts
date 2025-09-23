// import { Request, Response } from "express";
// import fs from "fs";
// import { GoogleGenerativeAI, Part } from "@google/generative-ai";
// import prisma from "../../utils/prisma";

// import axios from "axios";

// import cloudinary from "../../utils/cloudinary";

// // types/assignmentAnalysis.ts
// export interface AssignmentAnalysis {
//   totalTasks: number;
//   correctTasks: number;
//   score: number;
//   summary: string;
//   mistakes: string[];
//   uncertain: string[];
//   suggest: string;
//   overall: string;
// }

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// async function urlToGenerativePart(
//   url: string,
//   mimeType: string
// ): Promise<Part> {
//   const response = await axios.get(url, { responseType: "arraybuffer" });
//   const base64 = Buffer.from(response.data).toString("base64");
//   return {
//     inlineData: {
//       data: base64,
//       mimeType,
//     },
//   };
// }

// export const analyzeAssignment = async (req: Request, res: Response) => {
//   console.log("hi");
//   try {
//     const { studentId, assignmentId } = req.params;
//     // const { assignmentId } = req.body;

//     const assignmentIdNum = Number(assignmentId);
//     if (!assignmentIdNum) {
//       return res.status(400).json({ error: "assignmentId буруу байна" });
//     }

//     if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
//       return res.status(400).json({ error: "Зураг upload хийгдээгүй байна" });
//     }

//     const files = req.files as Express.Multer.File[];

//     // --- DB-d hadagalah suragchiin daalgawar (submission) ---
//     // Cloudinary ruu upload hiine
//     const uploadedUrls: string[] = [];

//     for (const f of files) {
//       const result = await cloudinary.uploader.upload(f.path, {
//         folder: "assignments", // Cloudinary "assignments" folder-r uuseneee
//       });
//       uploadedUrls.push(result.secure_url);
//       // local deer hadgalsan file-g ustganaa
//       fs.unlinkSync(f.path);
//     }

//     console.log("uploadedUrls", uploadedUrls);

//     // DB-d zuwhun cloudanry url hadaglagdan
//     const submission = await prisma.studentSubmission.create({
//       data: {
//         studentId: Number(studentId),
//         assignmentId: Number(assignmentId),
//         fileUrl: uploadedUrls.join(","),
//         status: "PENDING",
//       },
//     });

//     console.log("submission", submission);

//     // return res.json({ submission });

//     res.json({
//       success: true,
//       submission,
//     });

//     // --- AI nalyze async-r ajiluulan ---
//     (async () => {
//       try {
//         console.log("ai analyze starteddd");

//         console.log("uploadedUrls", uploadedUrls);

//         const parts = await Promise.all(
//           uploadedUrls.map((url) => urlToGenerativePart(url, "image/png"))
//         );

//         // console.log("partssss", parts);

//         const model = genAI.getGenerativeModel({
//           model: "gemini-2.5-flash",
//           generationConfig: {
//             temperature: 0,
//             topP: 1,
//             topK: 1,
//           },
//         });

//         const prompt = `
// Чи зөвхөн JSON буцаа. Markdown, текст, тайлбар битгий оруул.
// Чи зөвхөн сурагчийн бодлого бүрийн үнэн зөв байдлаар дүн гаргана.
// Сурагчийн бичсэн оноо, тайлбарыг тоохгүй.

// **[ЗОРИЛГО]**
// - totalTasks-г зураг дээрх бодит, бие даасан бодлогын тоогоор гаргана.
// - mistakes-д зөвхөн үнэхээр буруу бодсон бодлогууд орно.
// - uncertain-д зөвхөн будлиантай, ойлгомжгүй тэмдэгт, тоо орно.
// - correctTasks, score-г зөвхөн бодлогын үнэн байдал дээр үндэслэнэ.
// - overall-г ерөнхий багшийн дүгнэлт маягтай, товч, “энэ сурагч ийм л ажил хийсэн байна” гэсэн ойлголт төрүүлэх маягтай гаргана.
// - suggest-г заавал **богино, нэг өгүүлбэрийн зөвлөмж** болгож гаргана.

// **[TOTALTASKS]**
// - totalTasks = correctTasks + mistakes.length + uncertain.length
// - Нэг бодлого = нэг бие даасан асуулт, зураг хэд байсныг үл харгалзан
// - Завсрын алхам, үргэлжлэл, нэмэлт тооцоолол, хариу тусдаа бодлого гэж тооцохгүй

// **[SUMMARY]**
// - summary-д заавал сурагч нийт хэдэн бодлого бодсон, хэдийг нь зөв бодсон, хувь (%)-г тооцоолон гаргах.
// - Жишээ: "Сурагч нийт 15 бодлогоос 9-ийг зөв бодож, 60% оноо авсан байна."
// - Энэ нь багшид хүүхдийн үр дүнг нэг хараад ойлгоход хялбар байх ёстой.

// **[JSON БҮТЭЦ]**
// {
//   "totalTasks": number,
//   "correctTasks": number,
//   "score": number,
//   "mistakes": [string],
//   "uncertain": [string],
//   "summary": string,
//   "overall": string,
//   "suggest": string
// }

// **ЖИШЭЭ overall тайлбар:**
// - "Ерөнхийд нь: энэ хүүхэд бодлого хийх чадвартай, зарим алдаа гаргасан байна."
// - "Ерөнхийд нь: хүүхэд бодлого ихэнхийг зөв хийсэн."
// - "Ерөнхийд нь: зарим бодлого будлиантай, дахин шалгах хэрэгтэй."

// **ЖИШЭЭ suggest тайлбар:**
// - "Бутархай тоонууд дээр илүү анхаараарай."
// - "Үржүүлэлт, хуваалтыг дахин давтаарай."
// - "Будлиантай бодлогуудаа багштайгаа хамт нягтлаарай."
// `;

//         const result = await model.generateContent([prompt, ...parts]);

//         let cleanOutput = (await result.response.text()).trim();
//         cleanOutput = cleanOutput
//           .replace(/^```json\s*/, "")
//           .replace(/^```\s*/, "")
//           .replace(/\s*```$/, "");

//         let parsed: AssignmentAnalysis;
//         // try {
//         //   parsed = JSON.parse(cleanOutput);
//         // } catch (e) {
//         //   console.error("AI JSON parse алдаа:", cleanOutput);
//         //   return;
//         // }

//         try {
//           parsed = JSON.parse(cleanOutput) as AssignmentAnalysis;
//           parsed.mistakes = Array.isArray(parsed.mistakes)
//             ? parsed.mistakes
//             : [parsed.mistakes];
//           parsed.uncertain = Array.isArray(parsed.uncertain)
//             ? parsed.uncertain
//             : [parsed.uncertain];
//         } catch (e) {
//           console.error("AI JSON parse алдаа:", cleanOutput);
//           return;
//         }

//         console.log("parsedddd", parsed);

//         const aiStident = await prisma.studentAssignmentAi.upsert({
//           where: {
//             studentId_assignmentId: {
//               studentId: Number(studentId),
//               assignmentId: Number(assignmentId),
//             },
//           },
//           update: {
//             score: parsed.score,
//             summary: parsed.summary,
//             mistakes: parsed.mistakes,
//             uncertain: parsed.uncertain,
//             suggestions: [parsed.suggest],
//             overall: parsed.overall,
//           },
//           create: {
//             studentId: Number(studentId),
//             assignmentId: Number(assignmentId),
//             score: parsed.score,
//             summary: parsed.summary,
//             mistakes: parsed.mistakes,
//             uncertain: parsed.uncertain,
//             suggestions: [parsed.suggest],
//             overall: parsed.overall,
//           },
//         });

//         console.log("aiStident::", aiStident);

//         // console.log("AI analysis saved for:", aiStident);

//         // --- Temporary files устгах ---
//         // files.forEach((f) => {
//         //   fs.unlink(f.path, (err) => {
//         //     if (err) console.error("File delete error:", err);
//         //   });
//         // });
//       } catch (aiErr) {
//         console.error("AI анализ алдаа:", aiErr);
//       }
//     })();
//   } catch (err: any) {
//     console.error(err);
//     res.status(500).json({
//       error: "API дуудлага хийхэд алдаа гарлаа: " + err.message,
//     });
//   }
// };

import { Request, Response } from "express";
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
  suggest: string;
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
  console.log("hi");
  try {
    const { studentId, assignmentId } = req.params;

    const assignmentIdNum = Number(assignmentId);
    if (isNaN(assignmentIdNum)) {
      return res.status(400).json({ error: "assignmentId буруу байна" });
    }

    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(400).json({ error: "Зураг upload хийгдээгүй байна" });
    }

    const files = req.files as Express.Multer.File[];

    // --- Cloudinary руу шууд buffer-ээс upload ---
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        { folder: "assignments" }
      );
      uploadedUrls.push(result.secure_url);
    }

    console.log("uploadedUrls", uploadedUrls);

    // --- DB-д хадгалах ---
    const submission = await prisma.studentSubmission.create({
      data: {
        studentId: Number(studentId),
        assignmentId: Number(assignmentId),
        fileUrl: uploadedUrls.join(","),
        status: "PENDING",
      },
    });

    console.log("submission", submission);

    res.json({
      success: true,
      submission,
    });

    // --- AI analysis async ---
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

**[ЗОРИЛГО]**
- totalTasks-г зураг дээрх бодит, бие даасан бодлогын тоогоор гаргана.
- mistakes-д зөвхөн үнэхээр буруу бодсон бодлогууд орно.
- uncertain-д зөвхөн будлиантай, ойлгомжгүй тэмдэгт, тоо орно.
- correctTasks, score-г зөвхөн бодлогын үнэн байдал дээр үндэслэнэ.
- overall-г ерөнхий багшийн дүгнэлт маягтай, товч, “энэ сурагч ийм л ажил хийсэн байна” гэсэн ойлголт төрүүлэх маягтай гаргана.
- suggest-г заавал **богино, нэг өгүүлбэрийн зөвлөмж** болгож гаргана.

**[TOTALTASKS]**
- totalTasks = correctTasks + mistakes.length + uncertain.length
- Нэг бодлого = нэг бие даасан асуулт, зураг хэд байсныг үл харгалзан
- Завсрын алхам, үргэлжлэл, нэмэлт тооцоолол, хариу тусдаа бодлого гэж тооцохгүй

**[SUMMARY]**
- summary-д заавал сурагч нийт хэдэн бодлого бодсон, хэдийг нь зөв бодсон, хувь (%)-г тооцоолон гаргах.
- Жишээ: "Сурагч нийт 15 бодлогоос 9-ийг зөв бодож, 60% оноо авсан байна."
- Энэ нь багшид хүүхдийн үр дүнг нэг хараад ойлгоход хялбар байх ёстой.

**[JSON БҮТЭЦ]**
{
  "totalTasks": number,
  "correctTasks": number,
  "score": number,
  "mistakes": [string],
  "uncertain": [string],
  "summary": string,
  "overall": string,
  "suggest": string
}

**ЖИШЭЭ overall тайлбар:**
- "Ерөнхийд нь: энэ хүүхэд бодлого хийх чадвартай, зарим алдаа гаргасан байна."
- "Ерөнхийд нь: хүүхэд бодлого ихэнхийг зөв хийсэн."
- "Ерөнхийд нь: зарим бодлого будлиантай, дахин шалгах хэрэгтэй."

**ЖИШЭЭ suggest тайлбар:**
- "Бутархай тоонууд дээр илүү анхаараарай."
- "Үржүүлэлт, хуваалтыг дахин давтаарай."
- "Будлиантай бодлогуудаа багштайгаа хамт нягтлаарай."
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
            uncertain: parsed.uncertain,
            suggestions: [parsed.suggest],
            overall: parsed.overall,
          },
          create: {
            studentId: Number(studentId),
            assignmentId: Number(assignmentId),
            score: parsed.score,
            summary: parsed.summary,
            mistakes: parsed.mistakes,
            uncertain: parsed.uncertain,
            suggestions: [parsed.suggest],
            overall: parsed.overall,
          },
        });

        console.log("aiStident::", aiStident);

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
