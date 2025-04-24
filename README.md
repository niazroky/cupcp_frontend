# ⚛️ React + Vite Frontend

This is the **frontend** of the CUPCP Exam Registration system, built using **React** and **Vite** for fast and modern development.

---

## 📁 Frontend Project Structure

```text
cupcp_frontend/
├── dist/
├── node_modules/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── CupcpHome/
│   │   ├── ExamForm/
│   │   ├── ExamSummary/
│   │   ├── ProtectedRoute/
│   │   └── UserRegister/
│   ├── pages/
│   │   ├── Academic/
│   │   ├── Authentication/
│   │   ├── JoinClub/
│   │   └── SeeMembers/
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
├── requirements.txt.txt
└── vite.config.js
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
