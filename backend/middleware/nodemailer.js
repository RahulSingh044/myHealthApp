const axios =  require('axios');

// Function: Send OTP email
async function sendOTPEmail(email, otp) {
    try {
        const mailOptions = {
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

        const response = await axios.post(`${process.env.EMAIL_API_URL}/send-email`, mailOptions);
        
        return response.data;
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Function: Verify Gmail configuration
async function verifyEmailConfig() {
    const res = await axios.get(`${process.env.EMAIL_API_URL}/`);
    console.log(res.data.message);
    return res.data.success;
}

module.exports = {
    sendOTPEmail,
    verifyEmailConfig
};