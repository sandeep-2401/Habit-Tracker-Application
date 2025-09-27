import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import axios from "axios";

const COLORS = ["#00BCD4", "#9C27B0", "#FF9800", "#4CAF50", "#F44336"];

export default function Charts() {
  const [dailyCounts, setDailyCounts] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/feed/chart?range=7", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setDailyCounts(res.data.dailyCounts);

        const pieData = Object.entries(res.data.categoryCounts).map(([name, value]) => ({ name, value }));
        setCategoryCounts(pieData);
      } catch (err) {
        console.error("Failed to fetch chart data:", err);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
      <div className="bg-white dark:bg-[#1E1E1E] shadow-md rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-4">Weekly Progress</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={dailyCounts}>
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="completed" stroke="#00BCD4" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-[#1E1E1E] shadow-md rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-4">Habit Categories</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={categoryCounts}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              fill="#00BCD4"
              label
            >
              {categoryCounts.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
