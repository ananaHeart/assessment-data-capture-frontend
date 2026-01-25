// src/layouts/MainLayout.jsx

import React from 'react';
// --- IMPORTANT: Add useNavigate ---
import { Link as RouterLink, Outlet, useNavigate } from 'react-router-dom';
// --- IMPORTANT: Add more components for the button ---
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ClassIcon from '@mui/icons-material/Class';
import LogoutIcon from '@mui/icons-material/Logout'; // <-- The logout icon

import authService from '../services/authService';

const drawerWidth = 240;

function MainLayout() {
  const navigate = useNavigate(); // <-- Get the navigate function
  const currentUser = authService.getCurrentUser();
  let menuItems = [];

  // This logic correctly builds the menu based on the user's role
  if (currentUser?.role === 'principal') {
    menuItems = [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/principal/dashboard' },
      { text: 'Data Management', icon: <PeopleIcon />, path: '/principal/manage-teachers' },
    ];
  } else if (currentUser?.role === 'teacher') {
    menuItems = [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/teacher/dashboard' },
      { text: 'Assessment', icon: <AssessmentIcon />, path: '/teacher/assessments' },
      { text: 'Classes', icon: <ClassIcon />, path: '/teacher/my-classes' },
    ];
  } else if (currentUser?.role === 'admin') {
    menuItems = [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    ];
  }

  // --- THIS IS THE NEW LOGOUT FUNCTION ---
  const handleLogout = () => {
    authService.logout(); // This clears the token from localStorage
    navigate('/login');   // This redirects the user to the login page
  };
  // ------------------------------------

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column' },
        }}
      >
        {/* Top part of the sidebar */}
        <Box>
          <Box sx={{ padding: 2, textAlign: 'center' }}>
              <Typography variant="h6" noWrap>
                {currentUser?.role === 'principal' ? 'Principal Portal' : 
                 currentUser?.role === 'teacher' ? 'Teacher Portal' :
                 'Admin Portal'}
              </Typography>
          </Box>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={RouterLink} to={item.path}>
                  <ListItemIcon sx={{color: 'primary.main'}}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* --- THIS IS THE NEW LOGOUT BUTTON AT THE BOTTOM --- */}
        <Box sx={{ marginTop: 'auto' }}> {/* This pushes everything below it to the bottom */}
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        {/* ------------------------------------------------ */}
      </Drawer>

      {/* Main content area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#eef2f6', minHeight: '100vh' }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default MainLayout;