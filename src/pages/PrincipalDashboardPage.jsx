import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import ClassIcon from "@mui/icons-material/Class";
import AssessmentIcon from "@mui/icons-material/Assessment";

import principalService from "../services/principalService";

function StatCard({ title, value, icon }) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        display: "flex",
        alignItems: "center",
        gap: 2,
        height: 110,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#e3f2fd",
          p: 1.5,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>

        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
      </Box>
    </Paper>
  );
}

function PrincipalDashboardPage() {
  const [summary, setSummary] = useState({
    totalTeachers: 0,
    totalStudents: 0,
    totalClasses: 0,
    totalAssessments: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await principalService.getDashboardSummary();
        setSummary(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>

      {/* Page Header */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Principal Dashboard
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={3}>
        Overview of school assessment activities.
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3}>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Teachers"
            value={summary.totalTeachers}
            icon={<PeopleIcon sx={{ fontSize: 30, color: "#1976d2" }} />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Students"
            value={summary.totalStudents}
            icon={<SchoolIcon sx={{ fontSize: 30, color: "#2e7d32" }} />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Classes"
            value={summary.totalClasses}
            icon={<ClassIcon sx={{ fontSize: 30, color: "#ed6c02" }} />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Assessments"
            value={summary.totalAssessments}
            icon={<AssessmentIcon sx={{ fontSize: 30, color: "#9c27b0" }} />}
          />
        </Grid>

      </Grid>

      {/* Placeholder Section */}
      <Box mt={5}>
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom>
            School Overview
          </Typography>

          <Typography variant="body2" color="text.secondary">
            More analytics like "Least Mastered Skills", "Grade Performance Trends",
            and "Teacher Assessment Summary" will appear here.
          </Typography>
        </Paper>
      </Box>

    </Box>
  );
}

export default PrincipalDashboardPage;