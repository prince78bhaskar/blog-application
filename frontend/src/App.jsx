import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Placement from "./pages/Placement";
import Course from "./pages/Course";
import Enroll from "./pages/Enroll";
import CourseDetails from "./pages/CourseDetails";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CourseLearning from "./pages/CourseLearning";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/About" element={<About/>} />
        <Route path="/placement" element={<Placement/>} />
        <Route path="/Course" element={<Course/>} />
        <Route path="/Enroll" element={<Enroll/>} />
        <Route path="/course/:courseId" element={<CourseDetails/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/course/:courseId" element={
          <ProtectedRoute>
            <CourseLearning/>
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminDashboard/>
          </ProtectedRoute>
        } />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </AuthProvider>
  );
}

export default App;
