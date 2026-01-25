// src/services/adminService.js
// This is the complete and correct version.

import api from './api';

// This function will get ALL users from the system
const getAllUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authorization token found.');

    // --- THIS IS THE FIX ---
    // The URL must be '/users' to get the whole list.
    const response = await api.get('/users', { 
      headers: { Authorization: `Bearer ${token}` }
    });
    // -----------------------

    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (userId, userData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authorization token found.');

    const response = await api.put(`/users/${userId}`, userData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authorization token found.');

    const response = await api.delete(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


const adminService = {
  getAllUsers,
  updateUser,
  deleteUser,
};

export default adminService;