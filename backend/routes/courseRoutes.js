const express = require('express');
const { createCourse, getAllCourses } = require('../controllers/courseController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, isAdmin, createCourse);
router.get('/', verifyToken, getAllCourses);

module.exports = router;
