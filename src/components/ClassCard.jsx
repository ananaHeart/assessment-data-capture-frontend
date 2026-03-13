import { Card, CardContent, CardActionArea, Typography } from "@mui/material";

function ClassCard({ cls, onClick }) {

  return (
    <Card sx={{ mb: 2, maxWidth: 600 }}>

      <CardActionArea onClick={onClick}>

        <CardContent>

          <Typography variant="h6">
            {cls.grade_level_name} - {cls.section_name}
          </Typography>

          <Typography color="text.secondary">
            {cls.subject_name}
          </Typography>

        </CardContent>

      </CardActionArea>

    </Card>
  );

}

export default ClassCard;