// src/components/ExamForm/TextInput.jsx
import React from "react";

export default function TextInput({ label, value, onChange, required = false }) {
  return (
    <div>
      <label className="block mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring focus:border-blue-400"
      />
    </div>
  );
}
