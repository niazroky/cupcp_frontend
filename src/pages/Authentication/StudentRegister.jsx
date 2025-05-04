/* src/pages/Authentication/StudentRegister.jsx */

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import Navbar from "../../components/CupcpHome/Navbar";
import Footer from "../../components/CupcpHome/Footer";
import RegistrationForm from "../../components/UserRegister/StudentRegForm";

const API_STUDENT_REG = "https://cupcp.com/api/auth/students/register/";

// Validation regexes
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const varsityIdRegex = /^\d{8}$/;
const phoneRegex = /^\d{11}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

const StudentRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    session: "",
    varsity_id: "",
    gender: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Enhanced validate: scroll to first invalid field if errors
  const validate = () => {
    const errs = {};
    if (!formData.full_name) errs.full_name = "Name is required.";
    if (!formData.email) errs.email = "Email is required.";
    else if (!emailRegex.test(formData.email))
      errs.email = "Invalid email format.";
    if (!formData.phone_number) errs.phone_number = "Phone number is required.";
    else if (!phoneRegex.test(formData.phone_number))
      errs.phone_number = "Phone must be exactly 11 digits.";
    if (!formData.session) errs.session = "Session is required.";
    if (!formData.varsity_id) errs.varsity_id = "Varsity ID is required.";
    else if (!varsityIdRegex.test(formData.varsity_id))
      errs.varsity_id = "Varsity ID must be exactly 8 digits.";
    if (!formData.gender) errs.gender = "Gender is required.";
    if (!formData.password) errs.password = "Password is required.";
    else if (!passwordRegex.test(formData.password))
      errs.password =
        "Password too weak. Use min 8 chars, uppercase, lowercase, number & special char.";
    if (formData.password !== formData.confirm_password)
      errs.confirm_password = "Passwords do not match.";

    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      // Scroll to first error field
      const first = Object.keys(errs)[0];
      const el = document.getElementsByName(first)[0];
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const { status } = await axios.post(API_STUDENT_REG, formData);
      if (status === 201) {
        setMessage("🎉 Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/academic/student-login"), 1500);
      }
    } catch (err) {
      console.error(err.response?.data);
      setErrors(err.response?.data || {});
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-800 text-white">
      <Navbar />

      <section className="flex-grow pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">
            Welcome, Student! 🎓
          </h1>
          <p className="text-lg sm:text-xl mb-10">
            Please fill out your details below to register for academic
            services.
          </p>

          <RegistrationForm
            selectedRole="student"
            formData={formData}
            errors={errors}
            message={message}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />

          <div className="mt-6">
            <p className="text-sm">
              Already registered?{" "}
              <Link
                to="/academic/student-login"
                className="underline text-blue-400 hover:text-blue-300"
              >
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
