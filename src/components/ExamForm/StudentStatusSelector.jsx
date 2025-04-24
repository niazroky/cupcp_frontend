// src/components/ExamForm/StudentStatusSelector.jsx
import React from "react";

export default function StudentStatusSelector({ studentStatus, setStudentStatus, registered, editing, setSelectedCourses, COURSES }) {
  const handleChange = (e) => {
    const status = e.target.value;
    setStudentStatus(status);
    if (!registered || editing) {
      setSelectedCourses(status === "regular" ? COURSES : []);
    }
  };

  return (
    <div>
      <label className="block mb-2">Student Status</label>
      <select
        value={studentStatus}
        onChange={handleChange}
        className="w-full p-3 bg-gray-700 rounded-lg focus:ring focus:border-blue-400"
      >
        <option value="regular">Regular</option>
        <option value="improvement">Improvement</option>
      </select>
    </div>
  );
}
