const { google } = require('googleapis');
const nodemailer = require('nodemailer');

// Helper: Create OAuth2-based Gmail transporter
async function createTransporter() {
    const oAuth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI
    );

    oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL_USER,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken.token,
        },
    });

    return transporter;
}

// Function: Send OTP email
async function sendOTPEmail(email, otp) {
    try {
        const transporter = await createTransporter();

        const mailOptions = {
            from: `MyHealth App <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Email Verification Code',
            html: `
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
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending email:', error.message);
        return { success: false, error: error.message };
    }
}

// Function: Verify Gmail configuration
async function verifyEmailConfig() {
    try {
        // Create a temporary transporter
        const transporter = await createTransporter();

        // Verify connection with Gmail SMTP server (via OAuth)
        await transporter.verify();

        console.log('✅ Gmail API configuration verified successfully.');
        return true;
    } catch (error) {
        console.error('❌ Email configuration error:', error.message);
        return false;
    }
}

module.exports = {
    sendOTPEmail,
    verifyEmailConfig
};