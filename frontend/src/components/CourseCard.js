// CourseCard.js
import React from 'react';
import PropTypes from 'prop-types';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
      <p className="text-gray-600">{course.description}</p>
      <div className="mt-2">
        <p className="text-sm text-gray-700"><strong>Start Date:</strong> {new Date(course.startDate).toLocaleDateString()}</p>
        <p className="text-sm text-gray-700"><strong>End Date:</strong> {new Date(course.endDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

// Prop validation
CourseCard.propTypes = {
  course: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  }).isRequired,
};

export default CourseCard;
