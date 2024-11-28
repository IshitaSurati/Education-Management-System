import React, { useEffect, useState } from 'react';
import api from '../services/api';
import CourseCard from '../components/CourseCard';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await api.get('/courses');
      setCourses(response.data);
    };
    fetchCourses();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
