// src/api/apiRoute.js

// Vite exposes any env var prefixed with VITE_ via import.meta.env
const BASE_URL = import.meta.env.VITE_BASE_URL;

const apiRoutes = {
  // === Student Auth Endpoints ===
  studentRegister: `${BASE_URL}/auth/students/register/`,
  studentLogin:    `${BASE_URL}/auth/students/login/`,

  // === Teacher Auth Endpoints ===
  teacherRegister: `${BASE_URL}/auth/teachers/register/`,
  teacherLogin:    `${BASE_URL}/auth/teachers/login/`,

  // === Shared/Auth Endpoints ===
  logout:        `${BASE_URL}/auth/logout/`,
  userProfile:   `${BASE_URL}/auth/user/`,
  token:         `${BASE_URL}/auth/api/token/`,
  refreshToken:  `${BASE_URL}/auth/api/token/refresh/`,

  // === Student Manager Endpoints ===
  myExamRegistration:       `${BASE_URL}/student-manager/exam-registration/my/`,
  examRegistrationSummary:  `${BASE_URL}/student-manager/exam-registration-summary/`,
};

export default apiRoutes;
