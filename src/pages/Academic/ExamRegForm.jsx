import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';                                // ← fix #1
import useExamRegistration from '../../components/ExamRegFormHelper/useExamRegistration';
import UserInfo from '../../components/ExamRegFormHelper/UserInfo';
import ErrorMessage from '../../components/ExamRegFormHelper/ErrorMessage';
import PaymentSelector from '../../components/ExamRegFormHelper/PaymentSelector';
import StudentStatusSelector from '../../components/ExamRegFormHelper/StudentStatusSelector';
import CourseSelector, { COURSES } from '../../components/ExamRegFormHelper/CourseSelector'; // ← fix #2
import SubmitButton from '../../components/ExamRegFormHelper/SubmitButton';
import apiRoutes from '../../api/apiRoute';

// Add Logout Functionality
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/ProtectedRoute/AuthContext';



export default function ExamRegForm() {
  const { loading, registered, regData, userInfo, setRegistered, setRegData } = useExamRegistration();
  const [editing, setEditing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('No');
  const [paymentSlip, setPaymentSlip] = useState('');
  const [studentStatus, setStudentStatus] = useState('regular');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [hallName, setHallName] = useState('');                              // ← NEW: hall state
  const [formError, setFormError] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const errorRef = useRef(null);


  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/academic/student-login", { replace: true });
  };


  // initialize form when data arrives
  useEffect(() => {
    if (!loading) {
      if (registered && regData) {
        setPaymentStatus(regData.payment_status);
        setPaymentSlip(regData.payment_slip || '');
        setStudentStatus(regData.student_status);
        setSelectedCourses(regData.courses);
        setHallName(regData.hall_name || '');                                  // ← NEW: populate from existing
      } else {
        setSelectedCourses(studentStatus === 'regular' ? COURSES : []);
        setHallName('');                                                      // ← NEW: reset
      }
    }
  }, [loading, registered, regData]);

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
    if (!hallName) {                                                        // ← NEW: validation for hall
      setFormError('Please select your hall name.');
      return false;
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
      hall_name: hallName,                                                   // ← NEW: include hall
    };

    try {
      const url = apiRoutes.myExamRegistration;
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

                {/* NEW: Hall selection field */}
                <div>
                  <label htmlFor="hall_name" className="block mb-2">Select Your Hall</label>
                  <select
                    id="hall_name"
                    name="hall_name"
                    value={hallName}
                    onChange={e => setHallName(e.target.value)}
                    disabled={registered && !editing}
                    className="w-full bg-gray-700 text-white p-2 rounded-xl"
                    required
                  >
                    <option value="" disabled>-- Choose hall --</option>
                    {/* List of hall options */}
                    <option value="Alaol Hall">Alaol Hall</option>
                    <option value="A. F. Rahman Hall">A. F. Rahman Hall</option>
                    <option value="Shahjalal Hall">Shahjalal Hall</option>
                    <option value="Suhrawardy Hall">Suhrawardy Hall</option>
                    <option value="Shah Amanat Hall">Shah Amanat Hall</option>
                    <option value="Shamsun Nahar Hall">Shamsun Nahar Hall</option>
                    <option value="Shaheed Abdur Rab Hall">Shaheed Abdur Rab Hall</option>
                    <option value="Pritilata Hall">Pritilata Hall</option>
                    <option value="Deshnetri Begum Khaleda Zia Hall">Deshnetri Begum Khaleda Zia Hall</option>
                    <option value="Masterda Surja Sen Hall">Masterda Surja Sen Hall</option>
                    <option value="Shaheed Farhad Hossain Hall">Shaheed Farhad Hossain Hall</option>
                    <option value="Bijoy 24 Hall">Bijoy 24 Hall</option>
                    <option value="Nawab Faizunnesa Hall">Nawab Faizunnesa Hall</option>
                    <option value="Atish Dipankar Hall">Atish Dipankar Hall</option>
                    <option value="Shilpi Rashid Chowdhury Hostel">Shilpi Rashid Chowdhury Hostel</option>
                  </select>
                </div>

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
          
          <br></br>
          <div className="text-right mb-4">
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl transition"
            >
              Logout
            </button>
          </div>

        </section>
      </main>
    </div>
  );
}