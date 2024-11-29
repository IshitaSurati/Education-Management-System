// AddCourse.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AddCourse = () => {
  const [course, setCourse] = useState({ title: '', description: '', startDate: '', endDate: '' });
  const [error, setError] = useState('');
  const history = useHistory();

  // Get the current user's role
  const getUserRole = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the JWT to get user details
      return decodedToken.role; // Assuming the role is stored in the token
    }
    return null;
  };

  // Redirect to dashboard if user is not authorized (not admin or teacher)
  useEffect(() => {
    const role = getUserRole();
    if (role !== 'admin' && role !== 'teacher') {
      history.push('/'); // Redirect to the homepage if user is not authorized
    }
  }, [history]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  // Handle form submit to add a course
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      await axios.post(
        'http://localhost:4000/api/courses',
        course,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in header
          },
        }
      );
      alert('Course added successfully');
      history.push('/admin-dashboard'); // Redirect to dashboard after success
    } catch (error) {
      setError('Error adding course. Please try again.');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Add Course</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Course Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={course.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={course.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={course.startDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={course.endDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
