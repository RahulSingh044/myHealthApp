import axios from 'axios';

export async function userAction() {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/profile/`,{
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }},
        );
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Verification failed'
        };
    }
}