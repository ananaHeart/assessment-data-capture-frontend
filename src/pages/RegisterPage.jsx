// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// --- NEW IMPORTS for the password toggle icon ---
import { Container, Box, Typography, TextField, Button, Paper, Alert, Grid, Link, Select, MenuItem, InputLabel, FormControl, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// ---------------------------------------------
import authService from '../services/authService';

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: 'female',
    dateBirth: '2000-01-01',
    email: '',
    password: '',
    confirmPassword: '' // <-- ADDED confirmPassword
  });
  
  // --- NEW state for password visibility ---
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- NEW handlers for the password toggle ---
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // ------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // --- NEW VALIDATION for matching passwords ---
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    
    try {
  const registrationData = { ...formData, role: 'teacher' }; // This is the main fix
  const response = await authService.register(registrationData);
  setSuccess(response.data.message + ' Redirecting to login...');
  setTimeout(() => { navigate('/login'); }, 2000);
} catch (err) {  
  setError(err.response?.data?.message || 'Registration failed.');
} finally { // <-- THIS IS THE FIX FOR THE LOADER
  setLoading(false);
}
}

  return (
    <Container component="main" maxWidth="xs">
      <Paper sx={{ marginTop: 8, padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Teacher Sign Up</Typography>
        {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ width: '100%', mt: 2 }}>{success}</Alert>}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} autoFocus />
          <TextField margin="normal" required fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
          <FormControl fullWidth margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select name="gender" value={formData.gender} label="Gender" onChange={handleChange}>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="male">Male</MenuItem>
            </Select>
          </FormControl>
          <TextField margin="normal" required fullWidth label="Birth Date" name="dateBirth" type="date" value={formData.dateBirth} onChange={handleChange} InputLabelProps={{ shrink: true }} />
          <TextField margin="normal" required fullWidth label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} />
          
          {/* --- UPDATED Password Field with Toggle --- */}
          <TextField 
            margin="normal" required fullWidth name="password" label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          {/* --- NEW Confirm Password Field with Toggle --- */}
          <TextField 
            margin="normal" required fullWidth name="confirmPassword" label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* --- DELETED: The Role dropdown is gone --- */}
          
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, padding: 1.5 }} disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
  Already have an account? Log in
</Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default RegisterPage;