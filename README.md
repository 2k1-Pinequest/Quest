# 📚 Edusnap
**Team 2k1** 
- 🧑‍💻 [Koko] https://github.com/Koko-seg
- 🧑‍💻 [Budaa] https://github.com/budaa1234
- 🧑‍💻 [Boloroo] https://github.com/L-era67
- 🧑‍💻 [Zolo] https://github.com/zolomoloko
- 🧑‍💻 [Otgoo] https://github.com/otgooo55
- 🧑‍💻 [Duluu] https://github.com/Dulbadrah
- 🧑‍💻 [Odkhuu] https://github.com/Odkhuu06
## 🚀 About EduSnap

**Background:**  
For mathematics teachers in general education schools, the task of reviewing students’ homework and notebooks is notably time-consuming. Research indicates that mathematics teachers spend an average of **3–4 minutes assessing each student’s written solutions**. Given the volume of students and the frequency of assignments, this significantly amplifies teachers’ daily workload. Consequently, teachers have limited opportunity to provide personalized feedback, which is essential for enhancing students’ mathematical understanding and skills.

**Goal:**  
To mitigate this challenge, the proposed system seeks to optimize the grading process and reduce the time required for evaluation.

### 📌 How the system works
1. Teachers establish a **virtual classroom** for each mathematics course.  
2. Students **enroll** in the classroom using a **unique code** and submit assignments electronically.  
3. Assignments are submitted as **image files** (photos or scanned solutions).  
4. An **AI module** automatically evaluates the solutions, generating **feedback + scores**.  
This system reduces workload, enhances grading efficiency, ensures fair feedback, and supports improved learning outcomes in mathematics.

---

## 📖 Terminology
- **Room** – Virtual workspace created by the teacher.  
- **Room Code** – Unique code for students to join a classroom.  
- **Assignment** – Task given by the teacher (text, PPT, Word, images).  
- **Submission** – Work submitted by students (text or files).  
- **AI Analysis** – Automatic evaluation + feedback generation.   
- **Manual Review** – Teacher reviews submissions with low/average AI scores.  
- **Teacher Dashboard** – Interface to create/review/manage assignments.  
- **Student Dashboard** – Interface to join classes and submit work.  
- **Evaluation Score** – AI-generated numerical score of quality.  

---
## 🔄 Functional Requirements

### 👩‍🏫 Teacher Flow
1. Log in and create a classroom.  
2. System generates a unique Classroom Code.  
3. Assign tasks to students.  
4. View submissions in Teacher Dashboard.  
5. AI analyzes and generates an Evaluation Score.   
6. Confirm evaluation → send results + feedback to students.  

### 🧑‍🎓 Student Flow
1. Join class with Classroom Code.  
2. Receive assignments in Student Dashboard.  
3. Submit work as text or upload file (PPT, Word, image).  
4. AI processes submission → analysis + evaluation.  
5. View AI evaluation + teacher’s confirmed score and feedback.   

---

## 🛠️ Tech Stack

### 🎨 Frontend / Backend
- **Next.js (React framework)** – UI development (SSR/SPA)  
- **Tailwind CSS + shadcn/ui** – Modern, responsive UI  
- **Node.js (Express/Fastify)** – APIs & user management  
- **Gemini API** – AI-powered question generation  
- **REST API** – Communication between frontend & backend  

### 🤖 AI Integration
- **OpenAI GPT** – Automated assignment checking & analysis  

### 🗄️ Database
- **Prisma ORM** – Schema & data handling  
- **PostgreSQL** – Store users, classrooms, submissions  

### ☁️ Deployment
- **Vercel** – Frontend hosting  
- **Railway / AWS** – Backend & database hosting  

### 📂 Others
- **PDF.js / Apache Tika** – Extract text from PDF/PPT  

---
