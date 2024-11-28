import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold">EMS</Link>
        <div className="space-x-4">
          {!token ? (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/signup" className="hover:underline">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="hover:underline">Dashboard</Link>
              <button onClick={handleLogout} className="bg-red-600 p-2 rounded">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
