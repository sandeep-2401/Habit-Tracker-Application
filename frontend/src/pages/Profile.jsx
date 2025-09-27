import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import UserInfoCard from "../components/UserInfoCard";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/feed/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data && res.data.user) setUser(res.data.user);
        else setError("User not found");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch user");
      });
  }, []);

  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;
  if (!user) return <div className="text-center mt-20 text-gray-400">Loading...</div>;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 overflow-hidden">
      
      {/* Navbar */}
      <Navbar />

      {/* Background Blobs */}
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

      {/* Profile Card */}
      <div className="flex justify-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-12 border border-gray-200 z-10 flex flex-col items-center"
        >
          <UserInfoCard user={user} vertical />
        </motion.div>
      </div>
    </div>
  );
}
