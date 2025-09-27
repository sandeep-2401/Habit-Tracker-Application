import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Habits from "./pages/Habits";
import Profile from "./pages/Profile";
import LandingPage from "./pages/LandingPage";

function App() {

  return (
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/habits' element={<Habits/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
  )
}

export default App
