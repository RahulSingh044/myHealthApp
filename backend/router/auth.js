const express = require('express');
const router = express.Router();
const User = require('../models/user');
const OTP = require('../models/otp');
const jwt = require('jsonwebtoken');
const { sendOTPEmail } = require('../middleware/nodemailer');
const { verifyEmailConfig } = require('../middleware/nodemailer');
const verifyUser = require('../middleware/verifyUser');

// Verify email configuration
verifyEmailConfig();


// Register new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser.isEmailVerified) {
            return res.status(400).json({
                success: false,
                message: 'Email is already registered.'
            });
        }

        let user;
        if (existingUser && !existingUser.isEmailVerified) {
            // Update existing unverified user
            existingUser.name = name;
            existingUser.password = password;
            user = existingUser;
        } else {
            // Create new user (unverified)
            user = new User({
                name,
                email,
                password,
                isEmailVerified: false
            });
        }

        // Save user
        await user.save();

        // Generate and send OTP
        const otpDoc = await OTP.createOTP(email);
        await sendOTPEmail(email, otpDoc.otp);

        res.status(201).json({
            success: true,
            message: 'Registration successful. Please verify your email.'
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: error.message
        });
    }
});

// Verify email with OTP
router.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Verify OTP
        const validity = await OTP.verifyOTP(email, otp);
        if (!validity.success) {
            return res.status(400).json(validity);
        }

        // Update user verification status
        const user = await User.findOneAndUpdate(
            { email },
            { isEmailVerified: true },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Email verified successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isEmailVerified: user.isEmailVerified
            }
        });

    } catch (error) {
        console.error('Email verification error:', error);
        res.status(500).json({
            success: false,
            message: 'Email verification failed',
            error: error.message
        });
    }
});

// Resend OTP
router.post('/resend-otp', async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Don't send OTP if email is already verified
        if (user.isEmailVerified) {
            return res.status(400).json({
                success: false,
                message: 'Email is already verified'
            });
        }

        // Generate and send new OTP
        const otpDoc = await OTP.createOTP(email);
        await sendOTPEmail(email, otpDoc.otp);

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully'
        });

    } catch (error) {
        console.error('Resend OTP error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to resend OTP',
            error: error.message
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = await User.findOne({ email }).select('+password +isEmailVerified');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Verify password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: 'Invalid password'
            });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,      // can't be accessed by JS
            secure: false,       // set true in production (HTTPS)
            sameSite: 'lax',     // or 'none' if cross-site (and using HTTPS)
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        res.status(200).json({
            success: true,
            message: 'Login successful'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Login failed',
            error: error.message
        });
    }
});

// Check logined status
router.get('/status', verifyUser, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-_id -__v');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User logged in',
            user: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to check user status',
            error: error.message
        });
    }
});

// Logout
router.post('/logout', verifyUser, async (req, res) => {
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'No user logged in.'
        })
    }
    res.clearCookie('token', { httpOnly: true });
    res.status(200).json({
        success: true,
        message: 'Logout successful'
    });
});

//Delete User
// router.delete('/delete', verifyUser, async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.userId);
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'User not found'
//             });
//         }
//         res.status(200).json({
//             success: true,
//             message: 'User deleted successfully'
//         })
//     } catch(err) {
//         res.status(500).json({
//             success: false,
//             message: 'Error deleting user',
//             error: err.message
//         })
//     }
// })

module.exports = router;
