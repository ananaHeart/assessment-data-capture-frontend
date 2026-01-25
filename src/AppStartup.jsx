// src/AppStartup.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SplashScreen from './components/SplashScreen'; // Make sure this path is correct
import WelcomePage from './pages/WelcomePage';       // Make sure this path is correct
import authService from './services/authService';

function AppStartup() {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // --- This is the core logic ---
    const user = authService.getCurrentUser();

    setTimeout(() => {
      setShowSplash(false); // Hide the splash screen after the animation
      
      if (user && user.role) {
        // If a user IS logged in, go directly to their dashboard
        navigate(`/${user.role}/dashboard`);
      } 
      // If no user is logged in, this component will stop and show the WelcomePage.
      
    }, 2000); // This should be slightly longer than your animation (1.5s)

  }, [navigate]);

  // This is what the user sees:
  if (showSplash) {
    return <SplashScreen />;
  } else {
    return <WelcomePage />;
  }
}

export default AppStartup;