# 📚 Edusnap

**Background:**  
In traditional education, mathematics teachers spend a large portion of their day manually collecting and grading students’ homework, often only checking whether answers are correct or incorrect while overlooking AI-assisted insights. Research shows that assessing a single student’s solution usually takes 2–4 minutes, and in classes with many students and frequent assignments, this workload can quickly become overwhelming, leaving little time for personalized guidance. A web-based platform allows teachers to efficiently review all student submissions in a scrollable format, quickly identifying which problems each student solved correctly or incorrectly. By automating parts of the grading process, the system significantly reduces teachers’ workload, frees up time for direct interaction with students, and ensures timely feedback. This not only helps prevent learning gaps and keeps students on track but also empowers teachers to focus on fostering problem-solving skills, guiding understanding, and improving overall classroom learning outcomes.


---

## 📖 Terminology
- **Room** – Virtual workspace created by the teacher.  
- **Room Code** – Unique code for students to join a classroom.  
- **Assignment** –  A task or coursework given by the teacher. Students can submit it in images.  
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
3. The student prepares the homework and submits it in one of the following formats:
   -Images (e.g., JPG, PNG). 
4. AI processes submission → analysis + evaluation.  
5. View AI evaluation + teacher’s confirmed score and feedback.   

---

## 🛠️ Tech Stack

### 🎨 Frontend / Backend
- **Next.js (React framework)** – UI development (SSR/SPA)  
- **Tailwind CSS + shadcn/ui** – Modern, responsive UI  
- **Node.js (Express/Fastify)** – APIs & user management  
- **Gemini API** – AI-powered assignment analysis & feedback
- **REST API** – Communication between frontend & backend  

### 🤖 AI Integration
- **Gemini** – Automated assignment checking & analysis

### 🗄️ Database
- **Prisma ORM** – Schema & data handling  
- **PostgreSQL** – Store users, classrooms, submissions  

### ☁️ Deployment
- **Vercel** – Frontend & backend & database hosting  

---
