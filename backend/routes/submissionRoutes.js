const express = require('express');
const {
    addSubmission,
    getSubmissionsByCourse,
    getSubmissionsByStudent,
} = require('../controllers/submissionController');
const { authenticate, authorizeRole } = require('../middlewares/authMiddleware');

const router = express.Router();

// Add a new submission (Student only)
router.post('/', authenticate, authorizeRole('Student'), addSubmission);

// Get all submissions for a course (Teacher or Admin only)
router.get('/course/:courseId', authenticate, authorizeRole('Teacher', 'Admin'), getSubmissionsByCourse);

// Get all submissions by a student (Student or Admin only)
router.get('/student/:studentId', authenticate, authorizeRole('Student', 'Admin'), getSubmissionsByStudent);

module.exports = router;
