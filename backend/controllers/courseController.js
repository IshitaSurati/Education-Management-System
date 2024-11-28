const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
    const { title, description, startDate, endDate, teacher } = req.body;
    try {
        const course = new Course({ title, description, startDate, endDate, teacher });
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('teacher students');
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
