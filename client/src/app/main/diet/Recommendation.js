import React from "react";
import { Box, Typography } from "@mui/material";

const Recommendation = () => {
  return (
    <Box sx={{ textAlign: "center", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Diet Plan Recommendation
      </Typography>
      <Box>
        <Typography variant="body1">
          {/* Placeholder for diet recommendation content */}
          - High Protein Diet
          <br />
          - Low Carb Options
          <br />
          - Balanced Nutritional Intake
        </Typography>
      </Box>
    </Box>
  );
};

export default Recommendation;
