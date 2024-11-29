const Submission = require('../models/Submission');
const Course = require('../models/Course');
const User = require('../models/User');

exports.addSubmission = async (req, res) => {
    const { courseId, studentId, content } = req.body;

    try {
        const course = await Course.findById(courseId);
        const student = await User.findById(studentId);

        if (!course || !student || student.role !== 'Student') {
            return res.status(400).json({ message: 'Invalid course or student' });
        }

        const submission = new Submission({ course: courseId, student: studentId, content });
        await submission.save();
        res.status(201).json({ message: 'Submission added successfully', submission });
    } catch (error) {
        res.status(500).json({ message: 'Error adding submission', error: error.message });
    }
};

exports.getSubmissionsByCourse = async (req, res) => {
    const { courseId } = req.params;

    try {
        const submissions = await Submission.find({ course: courseId }).populate('student', 'name email').populate('course', 'title');
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSubmissionsByStudent = async (req, res) => {
    const { studentId } = req.params;

    try {
        const submissions = await Submission.find({ student: studentId }).populate('course', 'title');
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
