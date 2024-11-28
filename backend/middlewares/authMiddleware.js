const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Access forbidden' });
    next();
};

exports.isTeacher = (req, res, next) => {
    if (req.user.role !== 'Teacher') return res.status(403).json({ message: 'Access forbidden' });
    next();
};
exports.authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

// Check if user is an Admin
exports.authorizeRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ message: 'Access forbidden' });
    }
    next();
}; 