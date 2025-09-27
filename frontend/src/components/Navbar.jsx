// src/components/Navbar.jsx
import React from "react";

export default function Navbar({ userName, onLogout }) {
  return (
    <nav className="bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-600">HabitTracker</h1>
        <div className="space-x-6">
          <a href="/dashboard" className="text-gray-600 hover:text-purple-600">
            Dashboard
          </a>
          <a href="/habits" className="text-gray-600 hover:text-purple-600">
            Habits
          </a>
          <a href="/profile" className="text-gray-600 hover:text-purple-600">
            Profile
          </a>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
