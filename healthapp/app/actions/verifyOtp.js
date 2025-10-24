import axios from 'axios';

export async function verifyOtpAction(email, otp) {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/verify-otp`, { email, otp }, { withCredentials: true });
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Verification failed'
        };
    }
}

export async function resendOtpAction(email) {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/resend-otp`,{ email });
        console.log(res)
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to resend OTP'
        };
    }
}
