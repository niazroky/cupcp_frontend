import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const RegistrationForm = ({
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
        
        
        {/* Student Full Name */}
        <div className="mb-8">
          <label className="block mb-3 font-medium text-left">
            Your Full Name{" "}
            <span className="text-sm text-gray-400">
              (Will appear on your Grade Sheet)
            </span>
          </label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800"
          />
          {errors.full_name && (
            <p className="text-red-400 text-sm">{errors.full_name}</p>
          )}
        </div>


        {/* Student Email */}
        <div className="mb-8">
          <label className="block mb-3 font-medium text-left">
            Active Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800"
          />
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email}</p>
          )}
        </div>


        {/* Phone Number */}
        <div className="mb-8">
          <label className="block mb-3 font-medium text-left">
            Phone Number{" "}
            <span className="text-sm text-gray-400">
              (Enter exactly 11 digits):
            </span>
          </label>
          <input
            type="text"
            name="phone_number"
            maxLength={11}
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800"
          />
          {errors.phone_number && (
            <p className="text-red-400 text-sm">{errors.phone_number}</p>
          )}
        </div>


        {/* Session */}
        <div className="mb-8">
          <label className="block mb-3 font-medium text-left">Session: </label>
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
        <div className="mb-8">
          <label className="block mb-3 font-medium text-left">
            Varsity ID <span className="text-sm text-gray-400">(Enter exactly 8 digits):</span>
          </label>
          <input
            type="text"
            name="varsity_id"
            maxLength={8}
            value={formData.varsity_id}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800"
            placeholder=""
          />
          {errors.varsity_id && (
            <p className="text-red-400 text-sm">{errors.varsity_id}</p>
          )}
        </div>


        {/* Gender */}
        <div className="mb-8">
          <label className="block mb-3 font-medium text-left">Gender:</label>
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


        {/* Password */}
        <div className="mb-8 relative">
          <label className="block mb-1 font-medium text-left">Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 pr-10"
          />

          {/* Toggle Password Visibility */}
          <button
            type="button"
            onClick={togglePass}
            className="absolute top-10 right-3"
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
          {errors.password && (
            <p className="text-red-400 text-sm">{errors.password}</p>
          )}
        </div>


        {/* Confirm Password */} 
        <div className="mb-8 relative">
          <label className="block mb-3 font-medium text-left">Confirm Password:</label>
          <input
            type={showConfirm ? "text" : "password"}
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 pr-10"
          />

          {/* Toggle Confirm Password Visibility */}
          <button
            type="button"
            onClick={toggleConfirm}
            className="absolute top-12 right-3"
          >
            {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
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
