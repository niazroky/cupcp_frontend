// src/pages/Academic/ExamRegForm.jsx

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';                                // ← fix #1
import Navbar from '../../components/CupcpHome/Navbar';
import Footer from '../../components/CupcpHome/Footer';
import useExamRegistration from '../../components/ExamRegFormHelper/useExamRegistration';
import UserInfo from '../../components/ExamRegFormHelper/UserInfo';
import ErrorMessage from '../../components/ExamRegFormHelper/ErrorMessage';
import PaymentSelector from '../../components/ExamRegFormHelper/PaymentSelector';
import StudentStatusSelector from '../../components/ExamRegFormHelper/StudentStatusSelector';
import CourseSelector, { COURSES } from '../../components/ExamRegFormHelper/CourseSelector'; // ← fix #2
import SubmitButton from '../../components/ExamRegFormHelper/SubmitButton';

export default function ExamRegForm() {
  const { loading, registered, regData, userInfo, setRegistered, setRegData } = useExamRegistration();
  const [editing, setEditing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('No');
  const [paymentSlip, setPaymentSlip] = useState('');
  const [studentStatus, setStudentStatus] = useState('regular');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [formError, setFormError] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const errorRef = useRef(null);

  // initialize form when data arrives
  useEffect(() => {
    if (!loading) {
      if (registered && regData) {
        setPaymentStatus(regData.payment_status);
        setPaymentSlip(regData.payment_slip || '');
        setStudentStatus(regData.student_status);
        setSelectedCourses(regData.courses);
      } else {
        setSelectedCourses(studentStatus === 'regular' ? COURSES : []);
      }
    }
  }, [loading, registered, regData, studentStatus]);

  // scroll to error
  useEffect(() => {
    if (formError && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [formError]);

  const handleStudentStatusChange = e => {
    const status = e.target.value;
    setStudentStatus(status);
    if (!registered || editing) {
      setSelectedCourses(status === 'regular' ? COURSES : []);
    }
  };

  const toggleCourse = course => {
    if (registered && !editing) return;
    setSelectedCourses(prev =>
      prev.includes(course) ? prev.filter(c => c !== course) : [...prev, course]
    );
  };

  const validateForm = () => {
    if (studentStatus === 'improvement') {
      if (selectedCourses.length === 0) {
        setFormError('Select at least one course.');
        return false;
      }
      if (selectedCourses.length === COURSES.length) {
        setFormError('Cannot select all courses for improvement.');
        return false;
      }
    }
    setFormError('');
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = localStorage.getItem('accessToken');
    const payload = {
      phone_number: userInfo.phone_number,
      payment_status: paymentStatus,
      payment_slip: paymentStatus === 'Yes' ? paymentSlip : null,
      student_status: studentStatus,
      courses: selectedCourses,
    };

    try {
      const url = 'https://cupcp.com/api/student-manager/exam-registration/my/';
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = registered
        ? await axios.put(url, payload, config)
        : await axios.post(url, payload, config);
      const d = res.data.registration ?? res.data;
      setRegistered(true);
      setRegData(d);
      setEditing(false);
      setSubmitMessage('Registration submitted successfully.');
    } catch (err) {
      console.error(err.response?.data || err.message);
      setFormError('Error submitting form. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6">
        <section className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
            Exam Registration
          </h1>

          {registered && !editing ? (
            <div className="bg-gray-800 rounded-2xl p-6 shadow-lg mx-auto">
              <UserInfo userInfo={userInfo} />
              <p className="text-green-400 mb-6">You have already submitted your registration.</p>
              <button
                onClick={() => { setFormError(''); setSubmitMessage(''); setEditing(true); }}
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-6 rounded-xl transition"
              >
                Edit Registration
              </button>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-2xl p-6 shadow-lg mx-auto">
              <UserInfo userInfo={userInfo} />
              <ErrorMessage message={formError} errorRef={errorRef} />
              {submitMessage && <p className="text-green-300 mb-4">{submitMessage}</p>}

              <form onSubmit={handleSubmit} className="space-y-5">
                <PaymentSelector
                  paymentStatus={paymentStatus}
                  setPaymentStatus={setPaymentStatus}
                  paymentSlip={paymentSlip}
                  setPaymentSlip={setPaymentSlip}
                />
                <StudentStatusSelector
                  studentStatus={studentStatus}
                  onChange={handleStudentStatusChange}
                  disabled={registered && !editing}
                />
                <div>
                  <label className="block mb-2">Selected Courses</label>
                  <CourseSelector
                    studentStatus={studentStatus}
                    selectedCourses={selectedCourses}
                    toggleCourse={toggleCourse}
                    registered={registered}
                    editing={editing}
                  />
                </div>
                <SubmitButton registered={registered} />
              </form>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
