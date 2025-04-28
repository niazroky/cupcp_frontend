// src\pages\Authentication\TeacherRegister.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import Navbar from "../../components/CupcpHome/Navbar";
import Footer from "../../components/CupcpHome/Footer";
import RegistrationForm from "../../components/UserRegister/RegForm";

const API_TEACHER_REG = "http://13.202.55.139/api/api/teachers/register/";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

const TeacherRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validate = () => {
    let errs = {};
    if (!formData.full_name) errs.full_name = "Full name is required.";
    if (!formData.email) {
      errs.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      errs.email = "Invalid email address.";
    }
    if (!formData.password) {
      errs.password = "Password is required.";
    } else if (!passwordRegex.test(formData.password)) {
      errs.password =
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post(API_TEACHER_REG, formData);
        if (response.status === 201) {
          setMessage("Registration successful!");
          setFormData({
            full_name: "",
            email: "",
            password: "",
          });
          navigate("/academic/teacher-login");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "Registration failed. Please try again.";
        setMessage(errorMessage);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-800 text-white">
      <Navbar />

      <section className="flex-grow pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">Teacher Registration</h1>
          <p className="text-lg sm:text-xl mb-10">Register with your institutional email</p>

          <RegistrationForm
            selectedRole="teacher"
            formData={formData}
            errors={errors}
            message={message}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            buttonStyle="bg-green-600 hover:bg-green-700"
          />

          <div className="mt-6">
            <p className="text-sm">
              Already registered?{" "}
              <Link to="/academic/teacher-login" className="underline text-green-400 hover:text-green-300">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TeacherRegister;
