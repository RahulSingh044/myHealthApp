const jwt = require('jsonwebtoken');
const User = require('../models/user');

const verifyUser = async (req, res, next) => {
    try {
        // Get token from cookie (requires cookie-parser middleware)
        if (!req.cookies || !req.cookies.token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided in cookies.'
            });
        }

        const token = req.cookies.token;
        
        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Check if user still exists
            const user = await User.findById(decoded.userId).select('+isEmailVerified');
            if (!user) {
                res.clearCookie('token', { httpOnly: true });
                return res.status(404).json({
                    success: false,
                    message: 'User not found.'
                });
            }

            // Check if user is verified
            if (!user.isEmailVerified) {
                res.clearCookie('token', { httpOnly: true });
                return res.status(401).json({
                    success: false,
                    message: 'Please re-register your email first. The verification is incomplete.'
                });
            }

            // Attach user ID to request object
            req.userId = decoded.userId;
            next();

        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    message: 'Token has expired. Please login again.'
                });
            }
            return res.status(401).json({
                success: false,
                message: 'Invalid token.'
            });
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

module.exports = verifyUser;