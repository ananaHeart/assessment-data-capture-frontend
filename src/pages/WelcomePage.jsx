// src/pages/WelcomePage.jsx

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper, Stack } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

function WelcomePage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #f5f7fa, #e4ecf7)',
      }}
    >

      {/* Floating Bubbles Background */}
      <Box className="bubbles">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i}></span>
        ))}
      </Box>

      <Container component="main" maxWidth="md">
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Paper
            elevation={6}
            sx={{
              padding: { xs: 3, sm: 6 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              width: '100%',
              borderRadius: 3,
              zIndex: 2,
            }}
          >
            <SchoolIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />

            <Typography component="h1" variant="h3" gutterBottom>
              Welcome to SMART Assessment System
            </Typography>

            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Simplifying the way you manage school assessments.
            </Typography>

            {/* Buttons */}
            <Stack direction="row" spacing={2}>
              <Button
                component={RouterLink}
                to="/login"
                variant="contained"
                size="large"
                sx={{ padding: '10px 40px', fontSize: '1.05rem' }}
              >
                Login
              </Button>

              <Button
                component={RouterLink}
                to="/register"
                variant="outlined"
                size="large"
                sx={{ padding: '10px 40px', fontSize: '1.05rem' }}
              >
                Sign Up
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Container>

      {/* Bubble Animation Styles */}
      <style>
        {`
          .bubbles span {
  position: absolute;
  bottom: -150px;
  width: 60px;
  height: 60px;
  background: rgba(25, 118, 210, 0.35);
  border-radius: 50%;
  backdrop-filter: blur(2px);
  box-shadow: 0 0 20px rgba(25,118,210,0.4);
  animation: rise 18s infinite ease-in;
}

.bubbles span:nth-child(1) { left: 10%; animation-duration: 12s; }
.bubbles span:nth-child(2) { left: 20%; animation-duration: 16s; }
.bubbles span:nth-child(3) { left: 35%; width:80px; height:80px; animation-duration: 14s; }
.bubbles span:nth-child(4) { left: 50%; animation-duration: 20s; }
.bubbles span:nth-child(5) { left: 65%; width:70px; height:70px; animation-duration: 15s; }
.bubbles span:nth-child(6) { left: 75%; animation-duration: 13s; }
.bubbles span:nth-child(7) { left: 85%; width:75px; height:75px; animation-duration: 17s; }
.bubbles span:nth-child(8) { left: 40%; animation-duration: 19s; }
.bubbles span:nth-child(9) { left: 55%; animation-duration: 21s; }
.bubbles span:nth-child(10) { left: 70%; animation-duration: 15s; }
.bubbles span:nth-child(11) { left: 30%; animation-duration: 22s; }
.bubbles span:nth-child(12) { left: 90%; animation-duration: 18s; }

@keyframes rise {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.7;
  }

  100% {
    transform: translateY(-1100px) scale(0.4);
    opacity: 0;
  }
}
        `}
      </style>

    </Box>
  );
}

export default WelcomePage;