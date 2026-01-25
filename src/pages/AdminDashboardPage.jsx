// src/pages/AdminDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import adminService from '../services/adminService';
import { 
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, 
  Button, Box, Alert, Modal, TextField, Select, MenuItem, InputLabel, FormControl 
} from '@mui/material';

const modalStyle = {
  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4,
};

function AdminDashboardPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      setError('');
      const data = await adminService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch users.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    setError(''); setSuccess('');
    if (window.confirm('Are you sure you want to permanently delete this user?')) {
      try {
        const response = await adminService.deleteUser(userId);
        setUsers(users.filter(user => user.user_id !== userId));
        setSuccess(response.message);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete user.');
      }
    }
  };

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleFormChange = (e) => {
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
  };
  
  const handleSaveChanges = async () => {
    if (!selectedUser) return;
    setError(''); setSuccess('');
    
    const dataToUpdate = {
      firstName: selectedUser.first_name,
      lastName: selectedUser.last_name,
      email: selectedUser.email,
      role: selectedUser.role, // Admin can change the role
      status: selectedUser.status,
    };

    try {
      const response = await adminService.updateUser(selectedUser.user_id, dataToUpdate);
      setSuccess(response.message);
      handleCloseModal();
      fetchUsers(); // Refresh the list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user.');
    }
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Global User Management</Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.user_id}>
                <TableCell>{user.first_name} {user.last_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => handleOpenModal(user)} sx={{ mr: 1 }}>Edit</Button>
                  <Button size="small" color="error" onClick={() => handleDelete(user.user_id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* --- Edit User Modal --- */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">Edit User</Typography>
          {selectedUser && (
            <Box component="form" sx={{ mt: 2 }}>
              <TextField margin="normal" fullWidth label="First Name" name="first_name" defaultValue={selectedUser.first_name} onChange={handleFormChange} />
              <TextField margin="normal" fullWidth label="Last Name" name="last_name" defaultValue={selectedUser.last_name} onChange={handleFormChange} />
              <TextField margin="normal" fullWidth label="Email" name="email" defaultValue={selectedUser.email} onChange={handleFormChange} />
              <FormControl fullWidth margin="normal">
                <InputLabel>Role</InputLabel>
                <Select name="role" defaultValue={selectedUser.role} label="Role" onChange={handleFormChange}>
                  <MenuItem value="teacher">Teacher</MenuItem>
                  <MenuItem value="principal">Principal</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select name="status" defaultValue={selectedUser.status} label="Status" onChange={handleFormChange}>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="on_leave">On Leave</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={handleCloseModal} sx={{ mr: 1 }}>Cancel</Button>
                <Button variant="contained" onClick={handleSaveChanges}>Save Changes</Button>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
    </Paper>
  );
}

export default AdminDashboardPage;