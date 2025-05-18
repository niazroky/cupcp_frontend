import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Common/Navbar'
import Footer from '../components/Common/Footer'

const RootLayout = () => {
  return (
    <div>
        <Navbar />
        <div>
            <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default RootLayout