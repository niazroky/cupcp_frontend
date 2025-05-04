import React from 'react';
export default function SubmitButton({ registered }) {
  return (
    <button
      type="submit"
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition"
    >{registered ? 'Update Registration' : 'Submit Registration'}</button>
  );
}
