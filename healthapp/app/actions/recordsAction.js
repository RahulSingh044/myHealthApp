import axios from 'axios';

export async function addPrescribedMedicationAction(data) {
    try {
        console.log("data", data)
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/records/prescribed-record/add`, data ,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Verification failed'
        };
    }
}

export async function getPrescribedMedicationAction() {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/records/prescribed-record/all`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Verification failed'
        };
    }
}

export async function deletePrescribedMedicationAction(id) {
    try {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/records/prescribed-record/${id}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Verification failed'
        };
    }
}