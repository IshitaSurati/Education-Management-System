// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // Get the current user's role
  const getUserRole = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the JWT to get user details
      return decodedToken.role; // Assuming the role is stored in the token
    }
    return null;
  };

  const role = getUserRole();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">LMS</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">Signup</Link>
            </li>
            {role === 'admin' || role === 'teacher' ? (
              <li className="nav-item">
                <Link className="nav-link" to="/add-course">Add Course</Link>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
