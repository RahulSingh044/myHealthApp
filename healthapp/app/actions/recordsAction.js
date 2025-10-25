import axios from 'axios';

export async function addPrescribedMedicationAction(data) {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/records/prescribed-record/upload`, data, {
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' }
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
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/records/prescribed-record/all`, { withCredentials: true });
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
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/records/prescribed-record/${id}`, { withCredentials: true });
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Verification failed'
        };
    }
}

export async function uploadMedicalAction(formData) {
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/records/medical-record/upload`,
            formData,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        );
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Verification failed'
        };
    }
}

export async function getMedicalRecordsAction() {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/records/medical-record/all`, { withCredentials: true });
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Verification failed'
        };
    }
}

export async function deleteMedicalRecords(id) {
    try {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/records/medical-record/${id}`, { withCredentials: true });
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Verification failed'
        };
    }
}

export async function downloadMedicalReports() {
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/records/medical-record/download-all`,
            {
                withCredentials: true,
                responseType: 'blob', // important!
            }
        );

        // Create a download link
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'medical-records.zip';
        document.body.appendChild(a);
        a.click();
        a.remove();

        return { success: true, message: 'Download started' };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Download failed',
        };
    }
}

export async function fetchMedicalFile(id) {
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/records/medical-record/file/${id}`,
            {
                withCredentials: true,
                responseType: 'blob',
            }
        );

        return {
            success: true,
            data: res.data,
            headers: res.headers
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Fetch file failed'
        };
    }
}

export async function fetchPrescribedFile(id) {
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/records/prescribed-record/file/${id}`,
            {
                withCredentials: true,
                responseType: 'blob',
                withCredentials: true
            }
        );

        return {
            success: true,
            data: res.data,
            headers: res.headers
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Fetch file failed'
        };
    }
}
