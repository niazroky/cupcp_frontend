
// File: src/layout/RootLayout.jsx

import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Common/Navbar';
import Footer from '../components/Common/Footer';
import ScrollToTop from '../components/Common/ScrollToTop';

// Root layout component that conditionally renders different navbars and footers
const RootLayout = () => {
  const location = useLocation();

  // Determine if the current route is part of the academic section
  const useAcademicLayout = location.pathname.startsWith('/academic');

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <ScrollToTop />
      <Navbar />
      {/* Render page-specific content via <Outlet /> */}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
