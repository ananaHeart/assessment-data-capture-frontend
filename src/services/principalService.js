// src/services/principalService.js
import api from './api';

const getDashboardSummary = () => {
  return api.get('/school/dashboard-summary');
};

const getAllTeachers = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authorization token found.');
    
    // This API call gets ALL users with the role of 'teacher', regardless of status
    const response = await api.get('/users?role=teacher', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteTeacher = async (teacherId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authorization token found.');

    const response = await api.delete(`/users/${teacherId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// --- THIS IS THE NEW FUNCTION ---
const approveTeacher = async (teacherId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authorization token found.');

    // This calls our new PUT endpoint to change the status
    const response = await api.put(`/users/${teacherId}/status`, 
      { status: 'active' }, // The data we are sending
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add this function inside principalService.js
const updateTeacher = async (teacherId, teacherData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authorization token found.');

    const response = await api.put(`/users/${teacherId}`, teacherData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
// ---------------------------------

const principalService = {
  getAllTeachers,
  deleteTeacher,
  approveTeacher, 
  updateTeacher,
  getDashboardSummary,
};

export default principalService;