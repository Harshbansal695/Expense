import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Navbar from "./components/Navbar"; // Import Navbar
import { Toaster } from "@/components/ui/sonner";
import GetAll from "./components/GetAll";

function App() {
  // Manage user authentication state
  const [user, setUser] = useState(() => {
    return localStorage.getItem("user") === "true"; // Retrieve user state from localStorage
  });

  useEffect(() => {
    localStorage.setItem("user", user); // Store user state in localStorage
  }, [user]);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} /> {/* ✅ Navbar inside Router */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/getall" element={<GetAll />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
