import React from 'react';
export default function PaymentSelector({ paymentStatus, setPaymentStatus, paymentSlip, setPaymentSlip }) {
  return (
    <>
      <label className="block mb-2">Payment Status:</label>
      <select
        value={paymentStatus}
        onChange={e => setPaymentStatus(e.target.value)}
        className="w-full p-3 bg-gray-700 rounded-lg focus:ring focus:border-blue-400"
      >
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>
      {paymentStatus === 'Yes' && (
        <>
          <label className="block mb-2 mt-2">Payment Slip Number:</label>
          <input
            type="text"
            value={paymentSlip}
            onChange={e => setPaymentSlip(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 rounded-lg focus:ring focus:border-blue-400"
          />
        </>
      )}
    </>
  );
}
