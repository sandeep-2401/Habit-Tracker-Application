import React, { useState } from "react";
import { motion } from "framer-motion";

export default function HabitForm({ habit, onSubmit, onClose }) {
  const [title, setTitle] = useState(habit?.title || "");
  const [description, setDescription] = useState(habit?.description || "");
  const [category, setCategory] = useState(habit?.category || "Health");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return alert("Title is required");
    onSubmit({ _id: habit?._id, title, description, category });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-6 mb-6 shadow-md"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter habit title"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-inner text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/70 transition-all bg-white"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-inner text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/70 transition-all bg-white"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-inner text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400/70 transition-all bg-white"
          >
            <option value="Health">Health</option>
            <option value="Study">Study</option>
            <option value="Work">Work</option>
            <option value="Hobbies">Hobbies</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <motion.button
            type="button"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-xl bg-gray-200 text-gray-800 font-medium shadow hover:bg-gray-300 transition-all"
          >
            Cancel
          </motion.button>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold shadow hover:brightness-105 transition-all"
          >
            {habit ? "Update" : "Add"} Habit
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
