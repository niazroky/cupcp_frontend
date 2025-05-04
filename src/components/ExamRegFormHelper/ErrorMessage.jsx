import React from 'react';
export default function ErrorMessage({ message, errorRef }) {
  if (!message) return null;
  return (
    <p ref={errorRef} className="text-red-400 mb-4">
      {message}
    </p>
  );
}
