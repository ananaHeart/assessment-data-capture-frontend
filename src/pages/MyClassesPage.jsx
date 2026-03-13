// src/pages/MyClassesPage.jsx
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import teacherService from '../services/teacherService';
import { Paper, Box, Typography, Grid, Card, CardContent, CardActionArea, CircularProgress, Alert, Button, List, ListItem, ListItemText } from '@mui/material'; // <-- Added List components

function MyClassesPage() {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadClasses = async () => {
      try {
        setLoading(true);
        const data = await teacherService.getMyClasses();
        setClasses(data);
      } catch (err) {
        setError('Failed to load your classes.');
      } finally {
        setLoading(false);
      }
    };
    loadClasses();
  }, []);

  const handleClassSelect = async (classInfo) => {
    try {
      setLoading(true);
      setError('');
      setSelectedClass(classInfo);
      const studentData = await teacherService.getStudentsByClass(classInfo.class_id);
      setStudents(studentData);
    } catch (err) {
      setError('Failed to load students for this class.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToClasses = () => {
    setSelectedClass(null);
    setStudents([]);
    setError('');
  };

  const navigate = useNavigate();

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }
  
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (selectedClass) {
    return (
      <Paper sx={{ p: 3 }}>
        <Button onClick={handleBackToClasses} sx={{ mb: 2 }}>&larr; Back to My Classes</Button>
        <Typography variant="h4" gutterBottom>{selectedClass.grade_level_name} - {selectedClass.section_name}</Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>Subject: {selectedClass.subject_name}</Typography>
        <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>Student List</Typography>
        <Paper variant="outlined">
          <List>
            {students.length > 0 ? students.map((student, index) => (
              <ListItem key={student.student_id} divider={index < students.length - 1}>
                <ListItemText primary={`${student.last_name}, ${student.first_name}`} />
              </ListItem>
            )) : <ListItem><ListItemText primary="No students are enrolled in this class yet." /></ListItem>}
          </List>
        </Paper>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, minHeight: '80vh' }}>
      <Typography variant="h4" gutterBottom>My Classes</Typography>
      
      {/* --- THIS IS THE NEW, IMPROVED LOGIC --- */}
      {classes.length > 0 ? (
        <Grid container spacing={3}>
          {classes.map((cls) => (
            <Grid item xs={12} sm={6} md={4} key={cls.class_id}>
              <Card>
                <CardActionArea onClick={() => navigate(`/teacher/classes/${cls.class_id}`)}>
                  <CardContent>
                    <Typography variant="h5" component="div">{cls.subject_name}</Typography>
                    <Typography color="text.secondary">{cls.grade_level_name} - {cls.section_name}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography sx={{ mt: 4, textAlign: 'center' }}>
          You have not been assigned to any classes yet. Please contact your principal.
        </Typography>
      )}
      {/* ------------------------------------- */}
    </Paper>
  );
}

export default MyClassesPage;