import React from 'react';
export const COURSES = [
  'PHYS-101','PHYS-102','PHYS-103','PHYS-104',
  'PHYS-105','PHYS-106','PHYS-107','PHYS-108','ENG-001'
];
export default function CourseSelector({ studentStatus, selectedCourses, toggleCourse, registered, editing }) {
  if (studentStatus === 'regular') {
    return (
      <div className="p-3 bg-gray-700 rounded-lg text-gray-300">
        All courses auto-selected for regular.
        <ul className="mt-2 list-disc list-inside text-blue-400">
          {selectedCourses.map(c => <li key={c}>{c}</li>)}
        </ul>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3">
      {COURSES.map(course => (
        <button
          key={course}
          type="button"
          onClick={() => toggleCourse(course)}
          disabled={registered && !editing}
          className={`p-3 rounded-lg transition ${
            selectedCourses.includes(course) ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
          } ${registered && !editing ? 'opacity-50 cursor-not-allowed' : ''}`}
        >{course}</button>
      ))}
    </div>
  );
}
