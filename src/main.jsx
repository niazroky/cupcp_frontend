// Import necessary modules from the React library
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import the main App component and global styles(tailwind css)
import App from "./App.jsx";
import "./index.css";

// Import nav-bar pages
import JoinClubPage from "./pages/JoinClub/JoinClub.jsx";
import SeeMembers from "./pages/SeeMembers/SeeMembers.jsx";
import AcademicHome from "./pages/Academic/AcademicHome.jsx";

// Import authentication-related academic pages
import StudentRegister from "./pages/Authentication/StudentRegister.jsx";
import TeacherRegister from "./pages/Authentication/TeacherRegister.jsx";
import StudentLogin from "./pages/Authentication/StudentLogin.jsx";
import TeacherLogin from "./pages/Authentication/TeacherLogin.jsx";

// Import protected authentication success pages
import SuccessStudent from "./pages/Authentication/SuccessStudent.jsx";
import SuccessTeacher from "./pages/Authentication/SuccessTeacher.jsx";

// Import protected academic pages
// import ExamRegForm from "./pages/Academic/ExamRegForm.jsx";
import ExamRegistrationPage from "./pages/Academic/ExamRegForm.jsx";
import ExamRegSummary from "./pages/Academic/ExamRegSummary.jsx";

// Import forbidden page for handling unauthorized access
import Forbidden from "./pages/Authentication/Forbidden.jsx";
// Import NotFound page for handling 404 errors
import NotFound from "./pages/Authentication/NotFound.jsx";

// Import the PrivateRoute component for handling protected routes
import PrivateRoute from "./components/ProtectedRoute/PrivateRoute.jsx";

// Import the authentication context provider
import { AuthProvider } from "./components/ProtectedRoute/AuthContext.jsx";


// Import Academic Curriculum page
import PhysicsCurriculum from "./pages/Academic/PhysicsCurriculum.jsx";

// Initialize and render the root application
createRoot(document.getElementById("root")).render(
  <StrictMode> 
    {/* StrictMode helps identify potential issues in the application */}
    <AuthProvider> 
      {/* AuthProvider manages authentication state across the application */}
      <Router>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<App />} />
          <Route path="/join-club" element={<JoinClubPage />} />
          <Route path="/members" element={<SeeMembers />} />
          <Route path="/academic" element={<AcademicHome />} />
          <Route path="/forbidden" element={<Forbidden />} />

          {/* Authentication Routes */}
          <Route path="academic/student-register" element={<StudentRegister />} />
          <Route path="academic/teacher-register" element={<TeacherRegister />} />
          <Route path="academic/student-login" element={<StudentLogin />} />
          <Route path="academic/teacher-login" element={<TeacherLogin />} />

          {/* Protected Routes for Students */}
          <Route element={<PrivateRoute allowedRoles={["student"]} />}>
            <Route path="academic/success-student" element={<SuccessStudent />} />
            <Route path="academic/exam-form-fillup" element={<ExamRegistrationPage />} />
          </Route>

          {/* Protected Routes for Teachers */}
          <Route element={<PrivateRoute allowedRoles={["teacher"]} />}>
            <Route path="academic/success-teacher" element={<SuccessTeacher />} />
            <Route path="academic/exam-summary" element={<ExamRegSummary />} />
          </Route>

          {/* Academic Details Routes */}
          <Route path="academic/physics-curriculum" element={<PhysicsCurriculum />} />

          {/* Catch-all Route for 404 Not Found */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </AuthProvider>
  </StrictMode>
);
