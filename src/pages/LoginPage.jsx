// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  IconButton,
  InputAdornment,
  Grid,
  Link
} from '@mui/material';

import SchoolIcon from '@mui/icons-material/School';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import authService from '../services/authService';

function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {

      const data = await authService.login(email, password);

       // SAVE USER + TOKEN
  localStorage.setItem(
    "user",
    JSON.stringify({
      ...data.user,
      token: data.token
    })
  );


      const userRole = data.user.role;

      if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } 
      else if (userRole === 'principal') {
        navigate('/principal/dashboard');
      } 
      else if (userRole === 'teacher') {
        navigate('/teacher/dashboard');
      } 
      else {
        setError('Login successful, but user role is unknown.');
      }

    } catch (err) {

      const errorMessage =
        err.response?.data?.message ||
        'Login failed. Please try again.';

      setError(errorMessage);

    } finally {
      setLoading(false);
    }
  };

  return (

    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f7fa, #e4ecf7)'
      }}
    >

      <Container component="main" maxWidth="xs">

        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >

          {/* Header */}

          <SchoolIcon
            sx={{
              fontSize: 50,
              color: 'primary.main',
              mb: 1
            }}
          />

          <Typography component="h1" variant="h5">
            Log In
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Access your school dashboard
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{ width: '100%' }}
          >

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">

                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}

                    </IconButton>

                  </InputAdornment>
                )
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                padding: 1.4,
                fontWeight: 600
              }}
              disabled={loading}
            >
              {loading ? 'Logging In...' : 'Log In'}
            </Button>

            <Grid container justifyContent="center">
              <Grid item>
                <Link
                  component={RouterLink}
                  to="/register"
                  variant="body2"
                >
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>

          </Box>

        </Paper>

      </Container>

    </Box>

  );
}

export default LoginPage;