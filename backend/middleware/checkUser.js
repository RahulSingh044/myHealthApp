const jwt = require('jsonwebtoken');
const User = require('../models/user');

const checkUser = async (req, res, next) => {
    // Get token from cookie (requires cookie-parser middleware)
    if (!req.cookies || !req.cookies.token) {
        next();
        return;
    }

    const token = req.cookies.token;
    console.log(req);

    // Verify token
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        // Token is invalid or expired -> clear cookie and continue as unauthenticated
        res.clearCookie('token', { httpOnly: true });
        next();
        return;
    }

    // Check if user still exists
    const user = await User.findById(decoded.userId).select('+isEmailVerified');
    if (!user || !user.isEmailVerified) {
        res.clearCookie('token', { httpOnly: true });
        next();
        return;
    }

    // Attach user ID to request object
    req.userId = decoded.userId;
    next();
};

module.exports = checkUser;