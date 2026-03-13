import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import teacherService from "../services/teacherService";
import ClassCard from "../components/ClassCard";

function TeacherClassesPage() {

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await teacherService.getMyClasses();
        setClasses(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClasses();
  }, []);

  return (

    <div>

      <Typography variant="h4" gutterBottom>
        My Classes
      </Typography>

      <Grid container spacing={3}>

        {classes.map((cls) => (

          <Grid item xs={12} md={4} key={cls.class_id}>
            <ClassCard classData={cls} />
          </Grid>

        ))}

      </Grid>

    </div>
  );
}

export default TeacherClassesPage;