// src/pages/ManageTeachersPage.jsx
// This is the complete and final version.

import React, { useState, useEffect } from 'react';
import principalService from '../services/principalService';
import { 
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, 
  Button, Box, Alert, Modal, TextField, Select, MenuItem, InputLabel, FormControl 
} from '@mui/material';

// Style for the popup modal
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// This is a helper component to avoid repeating code for the two tables
const TeacherTable = ({ title, teachers, onApprove, onReject, onEdit }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h5" gutterBottom>{title}</Typography>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow><TableCell>Name</TableCell><TableCell>Email</TableCell><TableCell sx={{width: '30%'}}>Actions</TableCell></TableRow>
        </TableHead>
        <TableBody>
          {teachers.length === 0 ? (
            <TableRow><TableCell colSpan={3} align="center">No teachers in this category.</TableCell></TableRow>
          ) : (
            teachers.map((teacher) => (
              <TableRow key={teacher.user_id}>
                <TableCell>{teacher.first_name} {teacher.last_name}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>
                  {teacher.status === 'pending' ? (
                    <>
                      <Button size="small" variant="contained" color="success" onClick={() => onApprove(teacher.user_id)} sx={{ mr: 1 }}>Approve</Button>
                      <Button size="small" variant="outlined" color="error" onClick={() => onReject(teacher.user_id)}>Reject</Button>
                    </>
                  ) : (
                    <>
                      <Button size="small" onClick={() => onEdit(teacher)} sx={{ mr: 1 }}>Edit</Button>
                      <Button size="small" color="error" onClick={() => onReject(teacher.user_id)}>Delete</Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);


function ManageTeachersPage() {
  const [allTeachers, setAllTeachers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  // This function fetches the teachers from the backend
  const fetchTeachers = async () => {
    try {
      setError('');
      const data = await principalService.getAllTeachers();
      setAllTeachers(data);
    } catch (err) {
      setError('Failed to fetch teachers.');
    }
  };

  // This useEffect calls fetchTeachers() once when the page loads
  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleApprove = async (teacherId) => {
    setError(''); setSuccess('');
    try {
      const response = await principalService.approveTeacher(teacherId);
      setSuccess(response.message);
      fetchTeachers(); 
    } catch (err) {
      setError('Failed to approve teacher.');
    }
  };
  
  const handleDeleteOrReject = async (teacherId) => {
    setError(''); setSuccess('');
    const teacherToDelete = allTeachers.find(t => t.user_id === teacherId);
    const confirmationMessage = teacherToDelete?.status === 'pending'
      ? 'Are you sure you want to reject this registration?'
      : 'Are you sure you want to delete this teacher? This is permanent.';

    if (window.confirm(confirmationMessage)) {
      try {
        const response = await principalService.deleteTeacher(teacherId);
        setAllTeachers(allTeachers.filter(teacher => teacher.user_id !== teacherId));
        setSuccess(response.message);
      } catch (err) {
        setError(err.response?.data?.message || 'Action failed.');
      }
    }
  };

  const handleOpenModal = (teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTeacher(null);
  };

  const handleFormChange = (e) => {
    setSelectedTeacher({ ...selectedTeacher, [e.target.name]: e.target.value });
  };
  
  // --- THIS IS THE FINAL, WORKING VERSION OF handleSaveChanges ---
  // In src/pages/ManageTeachersPage.jsx
// In src/pages/ManageTeachersPage.jsx
const handleSaveChanges = async () => {
  if (!selectedTeacher) return;
  setError(''); setSuccess('');
  
  // --- THIS IS THE FINAL FIX ---
  // We will only send the fields that are in our form.
  // The backend will keep the old values for any fields we don't send.
  const dataToUpdate = {
    firstName: selectedTeacher.first_name,
    lastName: selectedTeacher.last_name,
    email: selectedTeacher.email,
    status: selectedTeacher.status,
  };

  try {
    const response = await principalService.updateTeacher(selectedTeacher.user_id, dataToUpdate);
    setSuccess(response.message);
    handleCloseModal();
    fetchTeachers(); // Refresh the list
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to update teacher.');
  }
};

  const pendingTeachers = allTeachers.filter(t => t.status === 'pending');
  const activeTeachers = allTeachers.filter(t => t.status !== 'pending'); // Show active, on_leave, etc.

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Teacher Management</Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <TeacherTable title="Pending Registrations" teachers={pendingTeachers} onApprove={handleApprove} onReject={handleDeleteOrReject} onEdit={handleOpenModal} />
      <TeacherTable title="Active Teachers" teachers={activeTeachers} onApprove={() => {}} onReject={handleDeleteOrReject} onEdit={handleOpenModal} />

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">Edit Teacher</Typography>
          {selectedTeacher && (
            <Box component="form" sx={{ mt: 2 }}>
              <TextField margin="normal" fullWidth label="First Name" name="first_name" value={selectedTeacher.first_name || ''} onChange={handleFormChange} />
              <TextField margin="normal" fullWidth label="Last Name" name="last_name" value={selectedTeacher.last_name || ''} onChange={handleFormChange} />
              <TextField margin="normal" fullWidth label="Email" name="email" value={selectedTeacher.email || ''} onChange={handleFormChange} />
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select name="status" value={selectedTeacher.status || 'active'} label="Status" onChange={handleFormChange}>
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

export default ManageTeachersPage;