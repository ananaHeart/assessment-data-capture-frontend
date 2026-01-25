// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#50DC46', // Your main green color
    },
    secondary: {
      main: '#DBFFD9', // Your light green color
    },
    background: {
      default: '#f7f9fc', // A very light, neutral background color
      paper: '#ffffff',   // The background for cards and components
    },
    text: {
      primary: '#333333', // Dark text for readability
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // A clean, modern font
    h1: { fontSize: '2.5rem', fontWeight: 600 },
    h2: { fontSize: '2rem', fontWeight: 600 },
    h3: { fontSize: '1.75rem', fontWeight: 600 },
    h4: { fontSize: '1.5rem', fontWeight: 600 },
    h5: { fontSize: '1.25rem', fontWeight: 600 },
    h6: { fontSize: '1rem', fontWeight: 600 },
  },
  components: {
    // We can customize specific components here
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded corners for buttons
          textTransform: 'none', // Buttons will have normal case text
          fontWeight: 600,
        },
      },
    },
    MuiPaper: { // This styles Cards, Dialogs, etc.
      styleOverrides: {
        root: {
          borderRadius: 12, // Rounded corners for cards
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)', // Your soft shadow effect
        },
      },
    },
  },
});

export default theme;