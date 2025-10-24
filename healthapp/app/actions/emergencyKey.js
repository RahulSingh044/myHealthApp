import axios from "axios";

export async function generateKeyAction() {
    try {
        const res = await axios.post('http://localhost:5000/api/profile/generate-emergency-key',{} ,{ withCredentials: true });
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Verification failed'
        };
    }
}