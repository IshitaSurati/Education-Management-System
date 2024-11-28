const Submission = require('../models/Submission');
const Course = require('../models/Course');
const User = require('../models/User');

// Add a new submission
const addSubmission = async (req, res) => {
    try {
        const { courseId, studentId, content } = req.body;

        // Validate course and student existence
        const course = await Course.findById(courseId);
        const student = await User.findById(studentId);
        if (!course || !student || student.role !== 'Student') {
            return res.status(400).json({ message: 'Invalid course or student' });
        }

        // Create submission
        const submission = new Submission({
            course: courseId,
            student: studentId,
            content,
        });

        await submission.save();
        res.status(201).json({ message: 'Submission added successfully', submission });
    } catch (error) {
        res.status(500).json({ message: 'Error adding submission', error: error.message });
    }
};

// Get all submissions for a course
const getSubmissionsByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        const submissions = await Submission.find({ course: courseId })
            .populate('student', 'name email')
            .populate('course', 'title');

        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching submissions', error: error.message });
    }
};

// Get all submissions by a student
const getSubmissionsByStudent = async (req, res) => {
    try {
        const { studentId } = req.params;

        const submissions = await Submission.find({ student: studentId })
            .populate('course', 'title');

        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching submissions', error: error.message });
    }
};

module.exports = {
    addSubmission,
    getSubmissionsByCourse,
    getSubmissionsByStudent,
};
