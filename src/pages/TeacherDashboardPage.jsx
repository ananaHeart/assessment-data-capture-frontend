import {
  Box,
  Typography,
  Avatar,
  Tabs,
  Tab,
  Paper,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import teacherService from "../services/teacherService";

const user = JSON.parse(localStorage.getItem("user"));

function TeacherDashboardPage() {
  const [tab, setTab] = useState(0);
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await teacherService.getMyClasses();
        setClasses(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <Box     sx={{
    maxWidth: 780,
    mx: "auto"
  }}>
      {/* Profile Header */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ width: 60, height: 60 }}>
            {user?.name?.charAt(0)}
          </Avatar>

          <Box
          >
            <Typography variant="h5">{user?.name}</Typography>
            <Typography color="text.secondary">{user?.role}</Typography>
          </Box>
        </Box>
      </Paper>

      {/* Tabs */}
      <Tabs value={tab} onChange={handleChange} sx={{ mb: 3 }}>
        <Tab label="Classes" />
        <Tab label="Settings" />
      </Tabs>

      {/* Classes */}
      {tab === 0 && (
        <Box>
          {classes.length === 0 ? (
            <Typography>No classes assigned.</Typography>
          ) : (
            classes.map((cls) => (
              <Card
                key={cls.class_id}
                sx={{
                  mb: 2,
                  borderRadius: 3,
                  boxShadow: 2,
                  transition: "0.2s",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <CardActionArea
                  onClick={() => navigate(`/teacher/classes/${cls.class_id}`)}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="600">
                      {cls.grade_level_name} - {cls.section_name}
                    </Typography>

                    <Typography color="text.secondary">
                      {cls.subject_name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))
          )}
        </Box>
      )}

      {/* Settings */}
      {tab === 1 && (
        <Box>
          <Typography>Teacher settings here.</Typography>
        </Box>
      )}
    </Box>
  );
}

export default TeacherDashboardPage;
