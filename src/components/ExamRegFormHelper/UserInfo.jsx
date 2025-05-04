import React from 'react';
export default function UserInfo({ userInfo }) {
  return (
    <div className="mb-4 space-y-2 text-left">
      <p>Hello <span className="font-semibold text-blue-400">{userInfo.full_name}</span></p>
      <p>Varsity ID: <span className="font-semibold text-blue-400">{userInfo.varsity_id}</span></p>
      <p>Session: <span className="font-semibold text-blue-400">{userInfo.session}</span></p>
      <p>Phone: <span className="font-semibold text-blue-400">{userInfo.phone_number}</span></p>
    </div>
  );
}
