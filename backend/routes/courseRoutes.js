const express = require('express');
const { createCourse, getAllCourses, updateCourse, deleteCourse } = require('../controllers/courseController');
const { authenticate, authorizeRole } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, authorizeRole('Admin'), createCourse);
router.get('/', authenticate, getAllCourses);
router.put('/:id', authenticate, authorizeRole('Admin'), updateCourse);
router.delete('/:id', authenticate, authorizeRole('Admin'), deleteCourse);

module.exports = router;
