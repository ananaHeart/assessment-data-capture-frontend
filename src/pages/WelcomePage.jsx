// src/pages/WelcomePage.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

function WelcomePage() {
  return (
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
          sx={{
            padding: { xs: 3, sm: 6 }, // Responsive padding
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%',
          }}
        >
          <SchoolIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography component="h1" variant="h3" gutterBottom>
            Welcome to the Automated Assessment System
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Simplifying the way you manage school assessments.
          </Typography>
          <Button
            component={RouterLink} // This makes the button act like a link
            to="/login"
            variant="contained"
            size="large"
            sx={{ padding: '10px 40px', fontSize: '1.1rem' }}
          >
            Go to Login
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}

export default WelcomePage;