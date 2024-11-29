const express = require('express');
const { signup, login, getAllUsers } = require('../controllers/authController');
const { authenticate, authorizeRole } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/users', authenticate, authorizeRole('Admin'), getAllUsers);

module.exports = router;
