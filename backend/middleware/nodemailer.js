const nodemailer = require('nodemailer');

// Create transporter for Gmail
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, // use TLS instead of SSL
    secure: false, // TLS requires false here
    auth: {
        user: process.env.EMAIL_USER, // your Gmail address
        pass: process.env.EMAIL_PASS  // your Gmail App Password
    },
    tls: {
        rejectUnauthorized: false // allows self-signed certs
    },
    connectionTimeout: 20000 // 20s timeout to avoid early failure
});

// HTML email template for OTP
const createEmailTemplate = (otp) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; text-align: center;">Email Verification</h2>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
            <p style="font-size: 16px; color: #666;">Your verification code is:</p>
            <h1 style="color: #007bff; text-align: center; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
            <p style="font-size: 14px; color: #999; text-align: center;">This code will expire in 10 minutes.</p>
            <p style="font-size: 14px; color: #666; margin-top: 20px;">If you didn't request this code, please ignore this email.</p>
        </div>
        <p style="font-size: 12px; color: #999; text-align: center; margin-top: 20px;">
            This is an automated email. Please do not reply.
        </p>
    </div>
`;

// Function to send OTP email
const sendOTPEmail = async (email, otp) => {
    try {
        const mailOptions = {
            from: {
                name: 'MyHealth App',
                address: process.env.EMAIL_USER
            },
            to: email,
            subject: 'Email Verification Code',
            html: createEmailTemplate(otp)
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
};

// Function to verify configuration on server start
const verifyEmailConfig = async () => {
    try {
        await transporter.verify();
        console.log('✅ Email configuration verified successfully.');
        return true;
    } catch (error) {
        console.error('❌ Email configuration error:', error);
        return false;
    }
};

module.exports = {
    sendOTPEmail,
    verifyEmailConfig
};
