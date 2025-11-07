import axios from "axios";

export async function signupAction(user) {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/register`, user);
    return res.data;
}

export async function logInAction(user) {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/login`, user, {
            withCredentials: true
        });
        return res.data
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Verification failed'
        };
    }
}

export async function logOutAction() {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/logout`,
        {},
        {
            withCredentials: true
        });
    return res.data
}

