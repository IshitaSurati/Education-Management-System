import React, { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard'; // Make sure the path is correct

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  // Function to fetch courses from the API
  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/courses'); // Update the URL to your API's correct endpoint

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Try parsing the response as JSON
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Failed to fetch courses');
    }
  };

  // Fetch courses when the component mounts
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Available Courses</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
