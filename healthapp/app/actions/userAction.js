import axios from 'axios';

export async function userAction() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/profile`, { withCredentials: true });
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Verification failed'
    };
  }
}

export async function editProfileAction(personalInfo, insuranceInfo) {
  try {
    const res = await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/profile`, {personalInfo, insuranceInfo}, { withCredentials: true });
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Verification failed'
    };
  }
}

export async function addAllergy(allergy) {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/profile/allergy`, {allergy}, { withCredentials: true });
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Verification failed'
    };
  }
}

export async function deleteAllergy(id) {
  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/profile/allergy/${id}`, { withCredentials: true });
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Verification failed'
    };
  }
}

export async function addChronic(chronicCondition) {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/profile/chronic-condition`,{ chronicCondition }, { withCredentials: true });
    return res.data;
  } catch (error) {3
    return {
      success: false,
      message: error.response?.data?.message || 'Verification failed'
    };
  }
}

export async function deleteChronic(id) {
  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/profile/chronic-condition/${id}`, { withCredentials: true });
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Verification failed'
    };
  }
}


