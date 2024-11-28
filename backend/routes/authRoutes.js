const express = require('express');
const { signup, login, getAllUsers } = require('../controllers/authController');
const { authorizeRole, authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
// Get all users (Admin only)
router.get('/', authenticate, authorizeRole('Admin'), getAllUsers);

module.exports = router;
