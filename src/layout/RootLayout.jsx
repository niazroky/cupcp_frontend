
// File: src/layout/RootLayout.jsx

import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Common/Navbar';
import Footer from '../components/Common/Footer';
import AcademicNavbar from '../components/Common/AcademicNavbar';
import AcademicFooter from '../components/Common/AcademicFooter';

// Root layout component that conditionally renders different navbars and footers
const RootLayout = () => {
  const location = useLocation();

  // Determine if the current route is part of the academic section
  const useAcademicLayout = location.pathname.startsWith('/academic');

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Render AcademicNavbar if route starts with /academic, otherwise render default Navbar */}
      {useAcademicLayout ? <AcademicNavbar /> : <Navbar />}

      {/* Render page-specific content via <Outlet /> */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Render AcademicFooter if route starts with /academic, otherwise render default Footer */}
      {useAcademicLayout ? <AcademicFooter /> : <Footer />}
    </div>
  );
};

export default RootLayout;
