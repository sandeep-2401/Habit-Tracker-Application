import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import HabitForm from "../components/HabitForm";
import HabitCard from "../components/HabitCard";

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [editingHabit, setEditingHabit] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchHabits = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/habit/view", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setHabits(res.data.habits);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddOrUpdate = async (habitData) => {
    try {
      if (habitData._id) {
        await axios.patch(`http://localhost:3000/api/habit/${habitData._id}/update`, habitData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      } else {
        await axios.post(`http://localhost:3000/api/habit/add`, habitData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      }
      setShowForm(false);
      fetchHabits();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (habitId) => {
    if (!window.confirm("Are you sure you want to delete this habit?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/habit/${habitId}/delete`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchHabits();
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkComplete = async (habitId) => {
    try {
      await axios.patch(`http://localhost:3000/api/habit/${habitId}/complete`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchHabits();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <Navbar userName="Sandeep" onLogout={handleLogout} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto mt-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Your Habits</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-5 py-2 rounded-xl shadow-lg hover:brightness-105 transition-all"
            onClick={() => { setEditingHabit(null); setShowForm(true); }}
          >
            Add Habit
          </motion.button>
        </div>

        {showForm && (
          <HabitForm
            habit={editingHabit}
            onSubmit={handleAddOrUpdate}
            onClose={() => setShowForm(false)}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {habits.map((habit) => (
            <HabitCard
              key={habit._id}
              habit={habit}
              onUpdate={() => { setEditingHabit(habit); setShowForm(true); }}
              onDelete={() => handleDelete(habit._id)}
              onMarkComplete={() => handleMarkComplete(habit._id)}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
