import React from 'react'
import Navbar from './components/navbar/nav'
import { Outlet } from 'react-router-dom'
import { useAuth } from './context/authcontext';

function Layout() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; 
  }
  return (
    <div className='bg'>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default Layout
