import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Placement from "./pages/Placement";
import Course from "./pages/Course";
import Enroll from "./pages/Enroll";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/placement" element={<Placement />} />
        <Route path="/Course" element={<Course />} />
        <Route path="/Enroll" element={<Enroll />} />
      </Routes>
    </>
  );
}

export default App;
