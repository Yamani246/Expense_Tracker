
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home.jsx'
import DashBoard from './components/dashboard/DashBoard.jsx'
import Login from './components/login-signup/Login.jsx'
import Signup from './components/login-signup/Signup.jsx'
import About from './components/about/About.jsx'
import { AuthProvider, useAuth } from './context/authcontext.jsx'
import Logout from './components/logout/logout.jsx'
import PrivateRoute from './privateRoute/PrivateRoute.jsx'
import Logo from './components/logo/logo.jsx'
import './App.css'
import Layout from './layout.jsx'
function App() {
  
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Layout />}>
              <Route path='' element={<Logo />} />
              <Route path='logout' element={<Logout />} />
              <Route path="about" element={<About />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path='/' element={<PrivateRoute />}>
                <Route path="home" element={<Home />} />
                <Route path="dashboard" element={<DashBoard />} />
              </Route>

            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App

