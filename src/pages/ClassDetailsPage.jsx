import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Paper, Typography, Button, Box, Tabs, Tab } from "@mui/material";
import teacherService from "../services/teacherService";

function ClassDetailsPage() {
  const { classId } = useParams();
  const navigate = useNavigate();

  const [tab, setTab] = useState(0);
  const [students, setStudents] = useState([]);
  const [assessments, setAssessments] = useState([]); // FIXED

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await teacherService.getStudentsByClass(classId);
        setStudents(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAssessments = async () => {
      try {
        const data = await teacherService.getAssessmentsByClass(classId);
        setAssessments(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudents();
    fetchAssessments();
  }, [classId]);

  return (
    <Box
      sx={{
        maxWidth: 780,
        mx: "auto",
      }}
    >
      {/* Back Button */}
      <Button
        variant="outlined"
        sx={{ mb: 2 }}
        onClick={() => navigate("/teacher/dashboard")}
      >
        ← Back to Classes
      </Button>

      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: 2,
        }}
      >
        <Typography variant="h4" sx={{ mb: 3 }}>
          Class Details
        </Typography>

        {/* Tabs */}
        <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Students" />
          <Tab label="Assessments" />
        </Tabs>

        {/* STUDENTS TAB */}
        {tab === 0 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Students
            </Typography>

            {students.length === 0 ? (
              <Typography color="text.secondary">No students found.</Typography>
            ) : (
              students.map((student) => (
                <Typography key={student.student_id} sx={{ mb: 1 }}>
                  {student.last_name}, {student.first_name}
                </Typography>
              ))
            )}
          </Box>
        )}

        {/* ASSESSMENTS TAB */}
        {tab === 1 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Assessments
            </Typography>

            {assessments.length === 0 ? (
              <Typography color="text.secondary">
                No assessments yet.
              </Typography>
            ) : (
              assessments.map((test) => (
                <Box key={test.test_id} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">{test.test_name}</Typography>

                  <Typography variant="body2" color="text.secondary">
                    {test.test_type} •{" "}
                    {new Date(test.test_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default ClassDetailsPage;
