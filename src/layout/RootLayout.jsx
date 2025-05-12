import React from 'react'
import Navbar from '../components/CupcpHome/Navbar'
import Footer from '../components/CupcpHome/Footer'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div>
        <Navbar/>
        <div>
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default RootLayout