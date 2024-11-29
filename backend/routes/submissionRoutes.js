const express = require('express');
const { addSubmission, getSubmissionsByCourse, getSubmissionsByStudent } = require('../controllers/submissionController');
const { authenticate, authorizeRole } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, authorizeRole('Student'), addSubmission);
router.get('/course/:courseId', authenticate, authorizeRole('Teacher', 'Admin'), getSubmissionsByCourse);
router.get('/student/:studentId', authenticate, authorizeRole('Student', 'Admin'), getSubmissionsByStudent);

module.exports = router;
