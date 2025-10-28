import axios from "axios";

export async function generateKeyAction() {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/profile/generate-emergency-key`,{} ,{ withCredentials: true });
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Verification failed'
        };
    }
}