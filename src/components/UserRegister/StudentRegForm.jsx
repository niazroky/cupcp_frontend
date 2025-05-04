
/* src/components/UserRegister/StudentRegForm.jsx */


import React, { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';

const RegistrationForm = ({
  selectedRole,
  formData,
  errors,
  message,
  handleChange,
  handleSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const togglePass = () => setShowPassword((v) => !v);
  const toggleConfirm = () => setShowConfirm((v) => !v);

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md max-w-md mx-auto">
      <form onSubmit={handleSubmit} noValidate>
        {/* Full Name */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Full Name <span className="text-sm text-gray-400">(will appear on your certificate)</span>
          </label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800"
            placeholder="write your name"
          />
          <p className="text-xs text-gray-500 mt-1">Please enter your real name.</p>
          {errors.full_name && (
            <p className="text-red-400 text-sm">{errors.full_name}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Active Email <span className="text-sm text-gray-400">(important for verification)</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800"
            placeholder="you@example.com"
          />
          <p className="text-xs text-gray-500 mt-1">Provide an email you check regularly.</p>
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Phone Number <span className="text-sm text-gray-400">(11 digits)</span>
          </label>
          <input
            type="text"
            name="phone_number"
            maxLength={11}
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800"
            placeholder="e.g. 017XXXXXXXX"
          />
          {errors.phone_number && (
            <p className="text-red-400 text-sm">{errors.phone_number}</p>
          )}
        </div>

        {/* Student-only fields */}
        {selectedRole === "student" && (
          <>
            {/* Session */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Session</label>
              <select
                name="session"
                value={formData.session}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800"
              >
                <option value="">Select session</option>
                {Array.from({ length: 11 }).map((_, idx) => {
                  const start = 2025 - idx;
                  const end = String(start + 1).slice(-2);
                  const val = `${start}-${end}`;
                  return (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  );
                })}
              </select>
              {errors.session && (
                <p className="text-red-400 text-sm">{errors.session}</p>
              )}
            </div>

            {/* Varsity ID */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">
                Varsity ID <span className="text-sm text-gray-400">(8 digits)</span>
              </label>
              <input
                type="text"
                name="varsity_id"
                maxLength={8}
                value={formData.varsity_id}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800"
                placeholder="8-digit ID"
              />
              {errors.varsity_id && (
                <p className="text-red-400 text-sm">{errors.varsity_id}</p>
              )}
            </div>
          </>
        )}

        {/* Gender */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <p className="text-red-400 text-sm">{errors.gender}</p>
          )}
        </div>


        {/* Password & Confirm */}
        <div className="mb-4 relative">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 pr-10"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={togglePass}
            className="absolute top-8 right-3"
          >
            {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}            
          </button>
          {errors.password && (
            <p className="text-red-400 text-sm">{errors.password}</p>
          )}
        </div>

        <div className="mb-6 relative">
          <label className="block mb-1 font-medium">Confirm Password</label>
          <input
            type={showConfirm ? "text" : "password"}
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 pr-10"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={toggleConfirm}
            className="absolute top-8 right-3"
          >
            {showConfirm ? <EyeOff size={18}/> : <Eye size={18}/>}            
          </button>
          {errors.confirm_password && (
            <p className="text-red-400 text-sm">{errors.confirm_password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 rounded transition"
        >
          Register
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-green-300">{message}</p>
        )}
      </form>
    </div>
  );
};

export default RegistrationForm;
