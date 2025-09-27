// src/components/StatsCards.jsx
import React from "react";

export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition"
        >
          <h3 className="text-gray-500">{stat.title}</h3>
          <p className="text-2xl font-bold text-purple-600">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
