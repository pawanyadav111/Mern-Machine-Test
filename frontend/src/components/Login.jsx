import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleChange = (e)=>{
    const { name, value } = e.target
    console.log(name, value)
    const copyLoginInfo = { ...loginInfo }
    copyLoginInfo[name] = value
    setLoginInfo(copyLoginInfo);
  }

  const handleLogin = async  (e)=>{
    e.preventDefault();
    const { email, password } = loginInfo
    if(!email || !password) {
      return handleError('email and password are required')
    }
    try {
      const url = "http://localhost:8080/auth/login"
      const response = await fetch(url, {
        method: "Post",
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(loginInfo)
      })
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if(success){
        handleSuccess(message);
        localStorage.setItem('token', jwtToken)
        localStorage.setItem('loggedInUser', name)
        setTimeout(()=>{
          navigate('/home')
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
             style={{ backgroundImage: "url('/images/login.avif')" }}>
        </div>
        <div className="w-full lg:w-6/12 p-8">
          <h1 className="text-3xl font-semibold text-gray-700 mb-6 text-center">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-gray-600">Email</label>
                <input 
                  onChange={handleChange}
                  type="email"
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                  name="email"
                  value={loginInfo.email}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600">Password</label>
                <input 
                  onChange={handleChange}
                  type="password"
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  name="password"
                  required
                  value={loginInfo.password}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="mt-4 w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Don't have an account? <Link to="/" className="text-blue-600 hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
