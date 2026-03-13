import { Outlet } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

function TeacherLayout() {

  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };


  return (
    <Box>

      {/* Topbar */}
      <AppBar position="static" color="primary">
        <Toolbar>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            SMART Assessment System
          </Typography>

          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>

        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Box sx={{ p: 4 }}>
        <Outlet />
      </Box>

    </Box>
  );
}

export default TeacherLayout;