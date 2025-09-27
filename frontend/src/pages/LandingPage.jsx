// src/pages/LandingPage.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const features = [
    { title: "Simple Habit Tracking", desc: "Add and mark habits complete with one click." },
    { title: "Visual Streaks", desc: "Stay motivated by seeing your streaks grow daily." },
    { title: "Progress Insights", desc: "Track your weekly and monthly progress at a glance." },
    { title: "Customizable Habits", desc: "Create habits that suit your lifestyle and goals." },
  ];

  const [highlight, setHighlight] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlight((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 overflow-hidden ">
      <motion.div
        animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-15%] left-[-25%] w-96 h-96 bg-emerald-300 rounded-full filter blur-3xl opacity-30"
      />
      <motion.div
        animate={{ scale: [1, 1.08, 1], rotate: [0, -5, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-20%] right-[-30%] w-[500px] h-[500px] bg-sky-300 rounded-full filter blur-3xl opacity-30"
      />
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] right-[-15%] w-72 h-72 bg-pink-300 rounded-full filter blur-2xl opacity-20"
      />

      <section className="relative flex flex-col items-center justify-center text-center pt-20 pb-16 z-10">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold text-gray-900 mb-4"
        >
          Turn Your Daily Goals into Lasting Habits
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-gray-600 max-w-xl mb-6"
        >
          Track your habits, see your progress, and stay motivated every day.
        </motion.p>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <button
            onClick={() => navigate("/register")}
            className="bg-emerald-400 hover:bg-emerald-500 text-black font-semibold px-6 py-3 rounded-xl transition"
          >
            Get Started
          </button>
        </motion.div>
      </section>

      <section className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 z-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: highlight === index ? 1 : 0.7,
              y: highlight === index ? 0 : 10,
            }}
            transition={{ duration: 0.8 }}
            className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-gray-200 flex flex-col justify-center"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{feature.title}</h2>
            <p className="text-gray-700">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      <section className="relative flex flex-col items-center justify-center mb-24 z-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Visualize Your Progress</h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {["Reading", "Exercise", "Meditation"].map((habit, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-gray-200 flex flex-col items-center transition-all"
            >
              <span className="text-5xl mb-4">{["📖","💪","🧘"][i]}</span>
              <h3 className="text-xl font-semibold mb-2">{habit}</h3>
              <p className="text-gray-700 text-center">Streak: {Math.floor(Math.random()*10)+1} days</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="relative flex flex-col items-center justify-center mb-16 z-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Build Your Best Habits?</h2>
        <button
          onClick={() => navigate("/register")}
          className="bg-emerald-400 hover:bg-emerald-500 text-black font-semibold px-8 py-4 rounded-xl transition text-lg"
        >
          Start Now
        </button>
      </section>

      <footer className="relative bg-white/70 backdrop-blur-md border-t border-gray-200 py-6 mt-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <div className="text-gray-900 font-bold text-xl mb-2 md:mb-0">
            HabitTrack
          </div>
          <div className="text-gray-500 text-sm">
            Made with 💜 for habit lovers
          </div>
        </div>
      </footer>
    </div>
  );
}
