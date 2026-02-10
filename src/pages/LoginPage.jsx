// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// --- NEW IMPORTS ---
import { Container, Box, Typography, TextField, Button, Paper, Alert, IconButton, InputAdornment, Grid} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// --------------------
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // --- NEW: Handler to toggle visibility ---
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault(); // Prevents the input from losing focus
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authService.login(email, password);
      
      // --- THIS IS THE UPDATED LOGIC ---
      // We check the user's role and navigate to the correct dashboard.
      const userRole = data.user.role;
      if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } else if (userRole === 'principal') {
        navigate('/principal/dashboard');
      } else if (userRole === 'teacher') {
        navigate('/teacher/dashboard');
      } else {
        // This is a fallback for any unexpected role
        setError('Login successful, but user role is unknown.');
      }

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper 
        sx={{
          marginTop: 8,
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        
        {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
        
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* --- UPDATED PASSWORD TEXTFIELD --- */}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            // This now changes based on our 'showPassword' state
            type={showPassword ? 'text' : 'password'} 
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // This is where we add the icon
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {/* This shows the correct icon based on the state */}
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* --------------------------------- */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, padding: 1.5 }}
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Log In'}
          </Button>
           <Grid container>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
    
  );
}

export default LoginPage;