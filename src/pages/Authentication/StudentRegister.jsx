// src\pages\Authentication\StudentRegister.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import Navbar from "../../components/CupcpHome/Navbar";
import Footer from "../../components/CupcpHome/Footer";
import RegistrationForm from "../../components/UserRegister/RegForm";

const API_STUDENT_REG = "http://13.202.55.139/api/api/students/register/";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const varsityIdRegex = /^\d{8}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

const StudentRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    session: "",
    varsity_id: "",
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
    if (!formData.session) errs.session = "Session is required.";
    if (!formData.varsity_id) {
      errs.varsity_id = "Varsity ID is required.";
    } else if (!varsityIdRegex.test(formData.varsity_id)) {
      errs.varsity_id = "Varsity ID must be exactly 8 digits.";
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
        const response = await axios.post(API_STUDENT_REG, formData);
        if (response.status === 201) {
          setMessage("Registration successful!");
          setFormData({
            full_name: "",
            email: "",
            session: "",
            varsity_id: "",
            password: "",
          });
          navigate("/academic/student-login");
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
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">Student Registration</h1>
          <p className="text-lg sm:text-xl mb-10">Register to access academic services</p>

          <RegistrationForm
            selectedRole="student"
            formData={formData}
            errors={errors}
            message={message}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            buttonStyle="bg-blue-600 hover:bg-blue-700"
          />

          <div className="mt-6">
            <p className="text-sm">
              Already registered?{" "}
              <Link to="/academic/student-login" className="underline text-blue-400 hover:text-blue-300">
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

export default StudentRegister;
