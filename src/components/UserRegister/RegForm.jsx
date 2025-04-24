// src\components\UserRegister\RegForm.jsx

import React from "react";

// RegistrationForm Component - Handles user registration based on selected role (Student or Teacher)
const RegistrationForm = ({
  selectedRole,  // Role of the user (student or teacher)
  formData,      // Form input data
  errors,        // Validation errors for the form fields
  message,       // Message to display (success, error, etc.)
  handleChange,  // Function to handle input changes
  handleSubmit,  // Function to handle form submission
}) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md max-w-md mx-auto">
      {/* Form element with submit handler and noValidate to prevent default HTML validation */}
      <form onSubmit={handleSubmit} noValidate>
        
        {/* Full Name Field */}
        <div className="mb-4">
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800"
            placeholder="John Doe"
          />
          {/* Display error message if validation fails */}
          {errors.full_name && (
            <p className="text-red-400 text-sm">{errors.full_name}</p>
          )}
        </div>

        {/* Email Field: Dynamic label based on selected role */}
        <div className="mb-4">
          <label className="block mb-1">
            {selectedRole === "student" ? "Email (Student)" : "Email (Teacher)"}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800"
            placeholder="example@example.com"
          />
          {/* Display error message if validation fails */}
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Additional fields for students only */}
        {selectedRole === "student" && (
          <>
            {/* Session Field for Student */}
            <div className="mb-4">
              <label className="block mb-1">Session</label>
              <input
                type="text"
                name="session"
                value={formData.session}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800"
                placeholder="2024-2025"
              />
              {/* Display error message if validation fails */}
              {errors.session && (
                <p className="text-red-400 text-sm">{errors.session}</p>
              )}
            </div>

            {/* Varsity ID Field for Student */}
            <div className="mb-4">
              <label className="block mb-1">Varsity ID</label>
              <input
                type="text"
                name="varsity_id"
                value={formData.varsity_id}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800"
                placeholder="8-digit ID"
              />
              {/* Display error message if validation fails */}
              {errors.varsity_id && (
                <p className="text-red-400 text-sm">{errors.varsity_id}</p>
              )}
            </div>
          </>
        )}

        {/* Password Field */}
        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800"
            placeholder="********"
          />
          {/* Display error message if validation fails */}
          {errors.password && (
            <p className="text-red-400 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 rounded transition"
        >
          Register
        </button>

        {/* Display a message after form submission (success or error) */}
        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </form>
    </div>
  );
};

export default RegistrationForm;
