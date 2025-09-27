import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import Charts from "../components/Charts";
import axios from "axios";

export default function Dashboard() {
  const [stats, setStats] = useState([
    { title: "Habits Created", value: 0 },
    { title: "Habits Completed", value: 0 },
    { title: "Completion Rate", value: "0%" },
  ]);

  const [chartData, setChartData] = useState({
    dailyCounts: [],
    categoryCounts: {},
  });

  const fetchChartData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/feed/chart", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const {
        totalHabits,
        totalCompleted,
        completionRate,
        dailyCounts,
        categoryCounts,
      } = res.data;

      const todayStr = new Date().toISOString().split("T")[0];

      const todayCompleted = dailyCounts[dailyCounts.length -1].completed

      const completionToday = ((todayCompleted/totalHabits)*100).toFixed(1)

      setStats([
        { title: "Habits Created", value: totalHabits },
        { title: "Habits Completed", value: todayCompleted },
        { title: "Completion Rate", value: `${completionToday}%` },
      ]);

      setChartData({
        dailyCounts,
        categoryCounts,
      });
    } catch (err) {
      console.error("Failed to fetch chart data:", err);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] to-white text-gray-800">
      <Navbar userName="Sandeep" onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold">Welcome back, Sandeep 👋</h2>
          <p className="text-gray-500">{new Date().toDateString()}</p>
        </div>

        <StatsCards stats={stats} />

        <Charts dailyCounts={chartData.dailyCounts} categoryCounts={chartData.categoryCounts} />
      </div>
    </div>
  );
}
