
// src/components/UserRegister/TeacherRegForm.jsx

import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';

const TeacherRegForm = ({ formData, errors, message, handleChange, handleSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const togglePassword = () => setShowPassword(v => !v);
  const toggleConfirm = () => setShowConfirm(v => !v);

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md max-w-md mx-auto">
      <form onSubmit={handleSubmit} noValidate>
        
        {/*Teacher Full Name */}
        <div className="mb-8">
          <label className="block mb-3 font-medium text-left">
            Your Full Name:
          </label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800"
            placeholder=""
            required
          />
          {errors.full_name && <p className="text-red-400 text-sm">{errors.full_name}</p>}
        </div>


        {/* Teacher Varsity Email */}
        <div className="mb-8">
          <label className="block mb-3 font-medium text-left">
            Instituional Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800"
            placeholder=""
            required
          />
          {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
        </div>


        {/* Phone Number */}
        <div className="mb-8">
          <label className="block mb-3 font-medium text-left">
            Phone Number <span className="text-sm text-gray-400">(Enter exactly 11 digits):</span>
          </label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            maxLength={11}
            className="w-full p-2 rounded bg-gray-800"
            placeholder=""
            required
          />
          {errors.phone_number && <p className="text-red-400 text-sm">{errors.phone_number}</p>}
        </div>


        {/* Password */}
        <div className="mb-8 relative">
          <label className="block mb-3 font-medium text-left">
            Password:
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 pr-10"
            placeholder=""
            required
          />

          {/* Toggle Password Visibility */}
          <button
            type="button"
            onClick={togglePassword}
            className="absolute top-12 right-3"
          >
            {showPassword ? <Eye size={18}/> : <EyeOff size={18}/>}            
          </button>
          {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
        </div>


        {/* Confirm Password */}
        <div className="mb-8 relative">
          <label className="block mb-3 font-medium text-left">
            Confirm Password: 
          </label>
          <input
            type={showConfirm ? "text" : "password"}
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 pr-10"
            placeholder=""
            required
          />

          {/* Toggle Confirm Password Visibility */}
          <button
            type="button"
            onClick={toggleConfirm}
            className="absolute top-12 right-3"
          >
            {showConfirm ? <Eye size={18}/> : <EyeOff size={18}/>}            
          </button>
          {errors.confirm_password && <p className="text-red-400 text-sm">{errors.confirm_password}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 rounded transition"
        >
          Register as Teacher
        </button>

        {message && <p className="mt-4 text-center text-sm text-green-300">{message}</p>}
      </form>
    </div>
  );
};

export default TeacherRegForm;
