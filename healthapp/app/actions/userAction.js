import axios from 'axios';

export async function userAction() {
  try {
    const res = await axios.get('http://localhost:5000/api/profile', { withCredentials: true });
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
    const res = await axios.patch('http://localhost:5000/api/profile', {personalInfo, insuranceInfo}, { withCredentials: true });
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
    const res = await axios.post('http://localhost:5000/api/profile/allergy', {allergy}, { withCredentials: true });
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
    const res = await axios.delete(`http://localhost:5000/api/profile/allergy/${id}`, { withCredentials: true });
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
    const res = await axios.post('http://localhost:5000/api/profile/chronic-condition',{ chronicCondition }, { withCredentials: true });
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Verification failed'
    };
  }
}

export async function deleteChronic(id) {
  try {
    const res = await axios.delete(`http://localhost:5000/api/profile/chronic-conditioncd hea/${id}`, { withCredentials: true });
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Verification failed'
    };
  }
}


