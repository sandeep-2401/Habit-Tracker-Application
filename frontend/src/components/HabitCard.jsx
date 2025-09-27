import React from "react";
import { motion } from "framer-motion";

export default function HabitCard({ habit, onUpdate, onDelete, onMarkComplete }) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-tr from-white/80 via-gray-50/80 to-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-6 flex flex-col justify-between shadow-md"
    >
      <div>
        <h3 className="text-xl font-semibold text-gray-900">{habit.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{habit.category}</p>
        {habit.description && <p className="text-gray-600 mt-2">{habit.description}</p>}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
          🔥 Streak: {habit.streak}
        </span>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onMarkComplete}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1 rounded-xl text-sm font-semibold shadow-md hover:brightness-105 transition-all"
          >
            Complete
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onUpdate}
            className="bg-gray-200 text-gray-800 px-3 py-1 rounded-xl text-sm font-medium hover:bg-gray-300 transition-all"
          >
            Edit
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDelete}
            className="bg-red-500 text-white px-3 py-1 rounded-xl text-sm font-medium shadow-md hover:brightness-105 transition-all"
          >
            Delete
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
