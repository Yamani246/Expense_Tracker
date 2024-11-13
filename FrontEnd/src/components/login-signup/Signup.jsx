import React, { useState } from 'react'
import './login.css'
import axios from 'axios'
import { useAuth } from '../../context/authcontext'
function Signup() {
  const {login}=useAuth()
  const [error,setError]=useState('')
  const [formData,setFormData]=useState({
    username:'',
    password:'',
    email:'',
    c_password:''
  })
  const handleChange=(e)=>{
    const {name,value}=e.target 
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.c_password) {
      setError('Passwords didn\'t match')
      return;
    }
    try{
      const response= await axios.post('http://127.0.0.1:8000/signup/',formData)
      const { token } = response.data;
      localStorage.setItem('access_token',token)
      login()
      window.location.href = 'home'
    } catch (error) {
      setError(error.response.data.error)
    }
  };

  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        Username:<input type='text' name='username' value={formData.username} onChange={handleChange} placeholder='username' required/>
        Email:<input type='email' name='email'onChange={handleChange} value={formData.email} placeholder='email' required/>
        Password:<input type='password' name='password' onChange={handleChange} value={formData.password} placeholder='password' required/>
        Confrim Password:<input type='confrim password' name='c_password' value={formData.c_password} onChange={handleChange} placeholder='Re-enter password' required/>
        <button type='submit' >Signup</button><br/>
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default Signup
