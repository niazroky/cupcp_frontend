import React from 'react';
export default function StudentStatusSelector({ studentStatus, onChange, disabled }) {
  return (
    <>
      <label className="block mb-2">Student Status:</label>
      <select
        value={studentStatus}
        onChange={onChange}
        disabled={disabled}
        className="w-full p-3 bg-gray-700 rounded-lg focus:ring focus:border-blue-400 disabled:opacity-60"
      >
        <option value="regular">Regular</option>
        <option value="improvement">Improvement</option>
      </select>
    </>
  );
}
