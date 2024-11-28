import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student'); // Default role is 'Student' (capitalized)
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      console.log("Request data:", { name, email, password, role }); // Debugging log

      // Send the data to the backend with the selected role
      const response = await api.post('http://localhost:4000/api/auth/signup', { name, email, password, role });

      // Handle successful response
      localStorage.setItem('token', response.data.token); // Store token on successful signup
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      // Handle error response
      console.error("Error response:", error.response); // Log the error for debugging
      if (error.response && error.response.data) {
        alert(`Signup failed: ${error.response.data.message || 'Unknown error'}`);
      } else {
        alert('An error occurred during signup.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        
        {/* Role selection dropdown */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        >
          <option value="Student">Student</option>
          <option value="Admin">Admin</option>
          <option value="Teacher">Teacher</option>
        </select>

        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
