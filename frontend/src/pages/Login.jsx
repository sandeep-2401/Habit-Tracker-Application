import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authServices";

export default function LoginPage() {
  const navigate = useNavigate();  
  const quotes = [
    "Keep building your streak, one day at a time.",
    "Progress, not perfection.",
    "Habits shape your future.",
    "Consistency creates magic.",
  ];
  const [quote, setQuote] = useState(quotes[0]);

  // Animate quote change every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    
    try{
        const data = await login({email,password});
        localStorage.setItem('token',data.token);
        navigate("/dashboard");

    }
    catch(err){
        setError(err.response?.data?.message || "login failed") 
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 overflow-hidden px-4">

      {/* Layered Background Blobs */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-20%] w-96 h-96 bg-emerald-300 rounded-full filter blur-3xl opacity-30"
      />
      <motion.div
        animate={{ scale: [1, 1.08, 1], rotate: [0, -5, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-15%] right-[-25%] w-[500px] h-[500px] bg-sky-300 rounded-full filter blur-3xl opacity-30"
      />
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] right-[-15%] w-72 h-72 bg-pink-300 rounded-full filter blur-2xl opacity-20"
      />

      {/* Glassy Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-12 border border-gray-200 z-10"
      >
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back 👋</h1>
        <motion.p
          key={quote} // Animate on quote change
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-gray-600 mt-2 mb-6"
        >
          {quote}
        </motion.p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 rounded-xl border border-gray-300
                         shadow-inner text-gray-900 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-emerald-400/70
                         transition-all bg-white"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 rounded-xl border border-gray-300
                         shadow-inner text-gray-900 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-emerald-400/70
                         transition-all bg-white"
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <motion.div whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.02 }}>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500
                         text-white py-3 rounded-xl font-semibold shadow-lg
                         hover:brightness-105 transition-all duration-200"
            >
              Login
            </button>
          </motion.div>
        </form>

        {/* Footer / Streak Info */}
        {/* <div className="mt-6 flex justify-between items-center text-gray-600 text-sm">
          <span className="flex items-center gap-1 animate-pulse">🔥 5-day streak active</span>
        </div> */}
      </motion.div>
    </div>
  );
}
