// src/pages/Authentication/TeacherRegister.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import TeacherRegForm from "../../components/UserRegister/TeacherRegForm";

const API_TEACHER_REG = "https://cupcp.com/api/auth/teachers/register/";

// Validation regexes
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{11}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

const TeacherRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Validate inputs
  const validate = () => {
    const errs = {};
    if (!formData.full_name) errs.full_name = "Full name is required.";
    if (!formData.email) errs.email = "Email is required.";
    else if (!emailRegex.test(formData.email)) errs.email = "Invalid email format.";
    if (!formData.phone_number) errs.phone_number = "Phone number is required.";
    else if (!phoneRegex.test(formData.phone_number)) errs.phone_number = "Phone must be exactly 11 digits.";
    if (!formData.password) errs.password = "Password is required.";
    else if (!passwordRegex.test(formData.password))
      errs.password = "Password too weak. Use min 8 chars, uppercase, lowercase, number & special char.";
    if (formData.password !== formData.confirm_password)
      errs.confirm_password = "Passwords do not match.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone_number' && value.length > 11) return; // limit
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await axios.post(API_TEACHER_REG, formData);
      if (res.status === 201) {
        setMessage("🎉 Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/academic/teacher-login"), 1500);
      }
    } catch (err) {
      console.error(err.response?.data);
      setMessage(err.response?.data?.detail || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-800 text-white">

      <section className="flex-grow pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">Teacher Registration</h1>
          <p className="text-lg sm:text-xl mb-10">Register with your institutional email and phone number</p>

          <TeacherRegForm
            formData={formData}
            errors={errors}
            message={message}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />

          <div className="mt-6">
            <p className="text-sm">
              Already registered?{' '}
              <Link to="/academic/teacher-login" className="underline text-green-400 hover:text-green-300">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default TeacherRegister;
