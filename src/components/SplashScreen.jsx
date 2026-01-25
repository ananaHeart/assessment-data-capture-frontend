import React from 'react';
import { Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

function SplashScreen() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'white',
      }}
    >
      <SchoolIcon sx={{ 
        fontSize: 80, 
        color: 'primary.main',
        animation: 'fadeInScaleUp 1.5s ease-in-out',
      }} />
      <style>
        {`
          @keyframes fadeInScaleUp {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </Box>
  );
}

export default SplashScreen;