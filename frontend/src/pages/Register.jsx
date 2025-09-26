import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { register } from "../services/authServices";
import { useAsyncError, useNavigate } from "react-router-dom";

export default function RegistrationPage() {
  const navigate = useNavigate();

  const quotes = [
      "Every journey starts with a single step.",
      "Consistency is your superpower.",
      "Build habits, build your future.",
    ];
  const [quote,setQuote] = useState(quotes[0]);

  useEffect(()=> {
    const id =setInterval(()=>{
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    },5000)
    return ()=> clearInterval(id)
  },[])

  const [uname,setUname] = useState("")
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")
  const [bio,setBio] = useState("")
  const [error,setError] = useState("");

  const handleSubmit = async(e)=> {
    e.preventDefault();
    if(!uname || !password || ! email){
        setError('username, email and password are required')
        return
    }
    
    const userData = {
        username : uname,
        email,
        password,
        bio,
    }

    try{
        const data = await register(userData)
        localStorage.setItem('token',data.token)
        navigate('/dashboard')
    }
    catch(err){
        setError(err.response?.data?.message || "login failed")
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 px-4 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-20%] w-96 h-96 bg-emerald-300 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-15%] right-[-25%] w-[500px] h-[500px] bg-sky-300 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-200 z-10"
      >
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900 text-left">Create your account</h1>
        <p className="text-sm text-gray-500 mt-1 text-left">{quote}</p>

        {/* Form */}
        <form 
            onSubmit={handleSubmit}
            className="mt-8 space-y-4">
          <div>
            <label className="block text-left text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              onChange={(e)=> setUname(e.target.value)}
              value={uname}
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-gray-900"
            />
          </div>
          <div>
            <label className="block text-left text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              onChange={(e)=> setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-gray-900"
            />
          </div>
          <div>
            <label className="block text-left text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              onChange={(e)=> setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-gray-900"
            />
          </div>
          <div>
            <label className="block text-left text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              onChange={(e)=> setBio(e.target.value)}
              value={bio}
              placeholder="Tell us a bit about yourself"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-gray-900 resize-none"
              rows={3}
            ></textarea>
          </div>

          <motion.div whileTap={{ scale: 0.97 }}>
            <button 
              type = "submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg py-3 text-md font-semibold transition-colors shadow">
              Register
            </button>
          </motion.div>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-500">🔥 Start your streak today!</span>
        </div>
      </motion.div>
    </div>
  );
}
