import React, { useState, useMemo, useContext } from 'react';
import { COURSES } from '../../components/ExamRegSummaryHelper/constants';
import downloadCSV from '../../components/ExamRegSummaryHelper/downloadCSV';
import useRegistrations from '../../components/ExamRegSummaryHelper/useRegistrations';
import Overview from '../../components/ExamRegSummaryHelper/Overview';
import Filter from '../../components/ExamRegSummaryHelper/Filter';
import DownloadButtons from '../../components/ExamRegSummaryHelper/DownloadButtons';
import DataTable from '../../components/ExamRegSummaryHelper/DataTable';
// Add Logout Functionality
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/ProtectedRoute/AuthContext';



export default function ExamRegSummary() {

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/academic/teacher-login", { replace: true });
  };

  const { data: registrations, error } = useRegistrations();
  const [filterText, setFilterText] = useState('');

  const totalStudents = registrations.length;
  const regularCount = useMemo(() => registrations.filter(r => r.student_status === 'regular').length, [registrations]);
  const improvementCount = useMemo(() => registrations.filter(r => r.student_status === 'improvement').length, [registrations]);

  const filtered = useMemo(() => {
    if (!filterText) return registrations;
    const t = filterText.toLowerCase();
    return registrations.filter(r =>
      r.id.toString().includes(t) ||
      (r.full_name || '').toLowerCase().includes(t) ||
      (r.varsity_id || '').toLowerCase().includes(t) ||
      (r.hall_name || '').toLowerCase().includes(t)     // ← NEW: filter by hall_name
    );
  }, [filterText, registrations]);

  const summary = useMemo(() => {
    const agg = COURSES.reduce((acc, c) => ({ ...acc, [c]: { regular: 0, improvement: 0, total: 0 } }), {});
    registrations.forEach(r => {
      const status = r.student_status;
      const list = Array.isArray(r.courses) && r.courses.length > 0 ? r.courses : status === 'regular' ? COURSES : [];
      list.forEach(c => {
        const code = typeof c === 'object' ? c.code : c;
        if (!agg[code]) return;
        agg[code][status]++;
        agg[code].total++;
      });
    });
    return agg;
  }, [registrations]);

  function handleDownloadStudentsCSV() {
    const headers = ['ID','Full Name','Varsity ID','Hall','Session','Phone','Payment','Slip #','Status','Courses']; // ← UPDATED: added 'Hall'
    const rows = registrations.map(r => [
      r.id,
      r.full_name,
      r.varsity_id,
      r.hall_name || '-',                            // ← NEW: include hall_name
      r.session,
      r.phone_number,
      r.payment_status,
      r.payment_slip||'-',
      r.student_status,
      Array.isArray(r.courses)? r.courses.map(c=> typeof c==='object'?c.code:c).join('; '):'-'
    ]);
    downloadCSV('registered_students.csv',[headers,...rows]);
  }

  function handleDownloadSummaryCSV() {
    const headers = ['Course','Regular','Improvement','Total'];
    const rows = COURSES.map(course => [course, summary[course].regular, summary[course].improvement, summary[course].total]);
    downloadCSV('course_summary.csv',[headers,...rows]);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6">
        <section className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">Exam Registration Summary</h1>
          {error && <div className="bg-red-600 p-4 rounded mb-6">{error}</div>}
          <Overview totalCourses={COURSES.length} totalStudents={totalStudents} regular={regularCount} improvement={improvementCount} />
          <Filter filterText={filterText} onChange={setFilterText} />
          <DownloadButtons onDownloadStudents={handleDownloadStudentsCSV} onDownloadSummary={handleDownloadSummaryCSV} />
          
          <DataTable
            columns={['Course','Regular','Improvement','Total']}
            rows={COURSES.map(course=>[course,summary[course].regular,summary[course].improvement,summary[course].total])}
          />

          <DataTable
            columns={['ID','Full Name','Varsity ID','Hall','Session','Phone','Payment','Slip #','Status','Courses']} // ← UPDATED: added 'Hall'
            rows={filtered.map(r => [
              r.id,
              r.full_name,
              r.varsity_id,
              r.hall_name || '-',                    // ← NEW: include hall_name
              r.session,
              r.phone_number,
              r.payment_status,
              r.payment_slip||'-',
              r.student_status,
              Array.isArray(r.courses)? r.courses.map(c=>typeof c==='object'?c.code:c).join(', '):'-'
            ])}
          />
          
        </section>
      </main>
    </div>
  );
}
