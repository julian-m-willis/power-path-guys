"use client";

import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import DietTracker from "./DietTracker";
import Recommendation from "./Recommendation";

const Diet = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "inherit",
          borderBottom: 1,
          borderColor: "divider",
          marginBottom: 2,
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          centered
          aria-label="diet navigation tabs"
        >
          <Tab label="Diet Tracker" />
          <Tab label="Recommendation" />
        </Tabs>
      </Box>

      {selectedTab === 0 && <DietTracker />}
      {selectedTab === 1 && <Recommendation />}
    </Box>
  );
};

export default Diet;
