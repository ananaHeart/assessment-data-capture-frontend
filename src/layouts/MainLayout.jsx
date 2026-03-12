// src/layouts/MainLayout.jsx

import React from 'react';
import { Link as RouterLink, Outlet, useNavigate, useLocation } from 'react-router-dom';

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  AppBar,
  Toolbar,
  Avatar
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ClassIcon from '@mui/icons-material/Class';
import LogoutIcon from '@mui/icons-material/Logout';
import SchoolIcon from '@mui/icons-material/School';

import authService from '../services/authService';

const drawerWidth = 240;

function MainLayout() {

  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = authService.getCurrentUser();

  let menuItems = [];

  if (currentUser?.role === 'principal') {
    menuItems = [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/principal/dashboard' },
      { text: 'Data Management', icon: <PeopleIcon />, path: '/principal/manage-teachers' },
    ];
  }

  else if (currentUser?.role === 'teacher') {
    menuItems = [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/teacher/dashboard' },
      { text: 'Assessment', icon: <AssessmentIcon />, path: '/teacher/assessments' },
      { text: 'Classes', icon: <ClassIcon />, path: '/teacher/my-classes' },
    ];
  }

  else if (currentUser?.role === 'admin') {
    menuItems = [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    ];
  }

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (

    <Box sx={{ display: 'flex' }}>

      {/* APPBAR */}
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: 'white',
          color: 'black'
        }}
      >
        <Toolbar>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Automated Assessment System
          </Typography>

          <Typography variant="body2" sx={{ mr: 2 }}>
            {currentUser?.role}
          </Typography>

          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
            {currentUser?.role?.charAt(0).toUpperCase()}
          </Avatar>

        </Toolbar>
      </AppBar>


      {/* SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#ffffff',
            borderRight: '1px solid #e0e0e0',
            display: 'flex',
            flexDirection: 'column'
          }
        }}
      >

        {/* LOGO AREA */}

        <Box sx={{ p: 3, textAlign: 'center' }}>

          <SchoolIcon
            sx={{
              fontSize: 40,
              color: 'primary.main',
              mb: 1
            }}
          />

          <Typography variant="h6">
            School Portal
          </Typography>

          <Typography variant="caption" color="text.secondary">
            {currentUser?.role}
          </Typography>

        </Box>

        <Divider />

        {/* MENU */}

        <List>

          {menuItems.map((item) => {

            const active = location.pathname === item.path;

            return (

              <ListItem key={item.text} disablePadding>

                <ListItemButton
                  component={RouterLink}
                  to={item.path}
                  selected={active}
                >

                  <ListItemIcon
                    sx={{
                      color: active ? 'primary.main' : 'inherit'
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText primary={item.text} />

                </ListItemButton>

              </ListItem>

            );

          })}

        </List>

        {/* LOGOUT */}

        <Box sx={{ mt: 'auto' }}>

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

      </Drawer>


      {/* MAIN CONTENT */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          backgroundColor: '#f5f7fa',
          minHeight: '100vh',
          mt: 8
        }}
      >

        <Outlet />

      </Box>

    </Box>
  );
}

export default MainLayout;