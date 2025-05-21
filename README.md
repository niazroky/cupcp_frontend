# ⚛️ React + Vite Frontend

This is the **frontend** of the CUPCP Exam Registration system, built using **React** and **Vite** for fast and modern development.

---

## 📁 Frontend Project Structure

```text
cupcp_frontend/
├── dist/
├── node_modules/
├── src/
│   ├── api/
│   │   └── apiRoute.js
│   ├── assets/
        ├── logo.svg
│   ├── components/
        ├──Common/
            ├── Footer.jsx
            ├── Navbar.jsx
│   │   ├── CupcpHome/
│   │   │   ├── About.jsx
│   │   │   ├── Cards.jsx
│   │   │   ├── Hero.jsx
│   │   ├── ExamRegFormHelper/
│   │   │   ├── CourseSelector.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   ├── PaymentSelector.jsx
│   │   │   ├── StudentStatusSelector.jsx
│   │   │   ├── SubmitButton.jsx
│   │   │   └── useExamRegistration.js
│   │   ├── ExamRegSummaryHelper/
│   │   │   ├── constant.js
│   │   │   ├── DataTable.jsx
│   │   │   ├── DownloadButton.jsx
│   │   │   ├── DownloadCSV.js
│   │   │   ├── Filter.jsx
│   │   │   ├── Overview.jsx
│   │   │   └── useRegistration.jsx
│   │   ├── ProtectedRoute/
│   │   │   ├── AuthContext.jsx
│   │   │   └── PrivateRoute.jsx
│   │   └── UserRegister/
│   │       ├── StudentRegForm.jsx
│   │       └── TeacherRegForm.jsx
│   ├── pages/
│   │   ├── Academic/
│   │   │   ├── AcademicHome.jsx
│   │   │   ├── ExamRegForm.jsx
│   │   │   └── ExamRegSummary.jsx
│   │   ├── Authentication/
│   │   │   ├── Forbidden.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── StudentLogin.jsx
│   │   │   ├── StudentRegister.jsx
│   │   │   ├── SuccessStudent.jsx
│   │   │   ├── SuccessTeacher.jsx
│   │   │   ├── TeacherLogin.jsx
│   │   │   └── TeacherRegister.jsx
│   │   ├── JoinClub/
│   │   │   └── JoinClub.jsx
│   │   └── SeeMembers/
│   │       └── SeeMembers.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── db.sqlite3
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── requirements.txt
```

---

## 🚀 How to Run the Project (Frontend)

Follow the steps below to run this frontend locally:

1. **Clone the repository**

```bash
git clone https://github.com/niazroky/cupcp_frontend.git
cd cupcp_frontend
```

2. **Install dependencies**

Make sure you have Node.js and npm installed, then run:

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

4. **Access the app**

Once the development server starts, open your browser and go to:

```
http://localhost:5173
```

---

## 🛠 Tech Stack

- React
- Vite
- React Router DOM
- Tailwind CSS (if used)
- Context API for state management
- JWT for authentication with backend

---

Make sure your backend is running on the expected URL (`http://localhost:8000` by default), and CORS is properly set up to allow API requests from the frontend.
