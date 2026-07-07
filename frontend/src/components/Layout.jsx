import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

/**
 * Layout Component
 * Provides a consistent layout with Navbar for all public pages
 * Uses React Router's Outlet to render child routes
 */
const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar - Shared across all pages */}
      <Navbar />
      
      {/* Main Content - Child routes render here */}
      <main className="flex-1">
        <Outlet />
      </main>
      
      {/* Footer can be added here if needed */}
    </div>
  );
};

export default Layout;
