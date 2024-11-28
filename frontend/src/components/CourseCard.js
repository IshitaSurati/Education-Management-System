import React from 'react';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-xl font-semibold">{course.title}</h3>
      <p>{course.description}</p>
      <p><strong>Start Date:</strong> {course.startDate}</p>
      <p><strong>End Date:</strong> {course.endDate}</p>
    </div>
  );
};

export default CourseCard;
