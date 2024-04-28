import React from 'react'
import { Link, NavLink ,} from 'react-router-dom'
import './nav.css'
import { useAuth } from '../../context/authcontext'
function Navbar() {
  const { isAuthenticated } = useAuth();
  return (
    <div className='container'>
      <nav className='navbar'>
        
        <NavLink className='nav-items' to='home'>Home</NavLink>
        <NavLink className='nav-items' to='dashboard'>Dashboard</NavLink>
        <NavLink className='nav-items' to='about'>About</NavLink>
        {isAuthenticated ? (
          <>
            <Link className='logo' to='dashboard'>Expense Tracker</Link>
            <NavLink className='reg' to='logout'>Logout</NavLink>
          </>
        ) : (
          <>
            <Link className='logo' to=''>Expense Tracker</Link>
            <NavLink className='reg' to='login'>Login</NavLink>
            <NavLink className='reg' to='signup'>Signup</NavLink>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
