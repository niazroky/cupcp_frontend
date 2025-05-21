// Importing necessary React components for the app
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"; // Importing necessary components from react-router-dom for routing
import RootLayout from "./layout/RootLayout.jsx";

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
import Home from "./pages/Home/Home.jsx";

// Import Academic Curriculum page
import PhysicsCurriculum from "./pages/Academic/PhysicsCurriculum.jsx";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
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
          <Route
            path="academic/exam-form-fillup"
            element={<ExamRegistrationPage />}
          />
        </Route>

        {/* Protected Routes for Teachers */}
        <Route element={<PrivateRoute allowedRoles={["teacher"]} />}>
          <Route path="academic/success-teacher" element={<SuccessTeacher />} />
          <Route path="academic/exam-summary" element={<ExamRegSummary />} />
        </Route>

        {/* Academic Details Routes */}
        <Route
          path="academic/physics-curriculum"
          element={<PhysicsCurriculum />}
        />

        {/* Catch-all Route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App; // Exporting the App component to be used in the main entry point
