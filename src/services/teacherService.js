// src/services/teacherService.js
import api from './api';

const getMyClasses = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authorization token found.');

    const response = await api.get('/classes/my-classes', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getStudentsByClass = async (classId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authorization token found.');

    const response = await api.get(`/enrollment/class/${classId}/students`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const teacherService = {
  getMyClasses,
  getStudentsByClass,
};

export default teacherService;