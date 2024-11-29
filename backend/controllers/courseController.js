const Course = require('../models/Course');

const createCourse = async (req, res) => {
  try {
    const { title, description, startDate, endDate, teacherId } = req.body;

    // Check if all required fields are provided
    if (!title || !description || !startDate || !endDate || !teacherId) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    // Validate teacherId
    const teacherExists = await User.findById(teacherId);
    if (!teacherExists) {
      return res.status(400).json({ message: 'Teacher not found.' });
    }

    const course = new Course({
      title, description, startDate, endDate, teacher: teacherId
    });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create course', error: err.message });
  }
};

// Controller to get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();  // Ensure this queries the correct model
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching courses', error: err.message });
  }
};

// Controller to update course
const updateCourse = async (req, res) => {
  try {
    const { title, description, startDate, endDate } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.startDate = startDate || course.startDate;
    course.endDate = endDate || course.endDate;

    await course.save();
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Error updating course', error: err.message });
  }
};

// Controller to delete course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting course', error: err.message });
  }
};

module.exports = { createCourse, getAllCourses, updateCourse, deleteCourse };
