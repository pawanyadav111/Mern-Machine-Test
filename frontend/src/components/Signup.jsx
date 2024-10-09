import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate()
  const handleChange = (e)=>{
    const { name, value } = e.target
    console.log(name, value)
    const copySignupInfo = { ...signupInfo }
    copySignupInfo[name] = value
    setSignupInfo(copySignupInfo);
  }

  const handleSignup = async  (e)=>{
    e.preventDefault();
    const { name, email, password } = signupInfo
    if(!name || !email || !password) {
      return handleError('name, email and password are required')
    }
    try {
      const url = "http://localhost:8080/auth/signup"
      const response = await fetch(url, {
        method: "Post",
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(signupInfo)
      })
      const result = await response.json();
      const { success, message, error } = result;
      if(success){
        handleSuccess(message);
        setTimeout(()=>{
          navigate('/login')
        }, 1000)
      } else if(error){
        const details = error?.details[0].message
        handleError(details)
      }
      else if(!success){
        handleError(message)
      }
      console.log(result)
    }
    catch(err)
    {
      handleError(err)
    }
  }

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-10/12 lg:w-8/12 bg-white rounded-lg shadow-lg flex overflow-hidden">
        <div className="hidden lg:block w-6/12 bg-cover bg-center" 
             style={{ backgroundImage: "url('/images/signup.jpg')" }}>
        </div>
        <div className="w-full lg:w-6/12 p-8">
          <h1 className="text-3xl font-semibold text-gray-700 mb-6 text-center">Register</h1>
          <form onSubmit={handleSignup}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-gray-600" htmlFor='name'>Name</label>
                <input 
                  onChange={handleChange}
                  name="name"
                  type="text"
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  required
                  value={signupInfo.name}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600" htmlFor='email'>Email</label>
                <input 
                  onChange={handleChange}
                  name="email"
                  type="email"
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                  value={signupInfo.email}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600" htmlFor='password'>Password</label>
                <input
                  onChange={handleChange} 
                  name="password"
                  type="password"
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                  value={signupInfo.password}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="mt-4 w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
