// src/components/ExamForm/CourseSelector.jsx
import React from "react";

export default function CourseSelector({ COURSES, selectedCourses, toggleCourse, studentStatus }) {
  if (studentStatus === "regular") {
    return (
      <div>
        <label className="block mb-2">Registered Courses</label>
        <ul className="grid grid-cols-2 gap-2">
          {COURSES.map(course => (
            <li
              key={course}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg text-center"
            >
              {course}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <label className="block mb-2">Select Courses for Improvement</label>
      <ul className="grid grid-cols-2 gap-2">
        {COURSES.map(course => (
          <li
            key={course}
            onClick={() => toggleCourse(course)}
            className={`cursor-pointer px-4 py-2 rounded-lg text-center border-2 transition select-none
              ${selectedCourses.includes(course) ? "bg-blue-500 border-blue-400" : "bg-gray-700 border-gray-600"}`}
          >
            {course}
          </li>
        ))}
      </ul>
    </div>
  );
}
