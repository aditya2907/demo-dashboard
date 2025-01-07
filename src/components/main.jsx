import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";

export default function MainContent() {
  const [tabValue, setTabValue] = useState(0);
  const [tabContent, setTabContent] = useState([]);

  // Function to add a new tab
  const handleAddTab = (item) => {
    setTabContent((prevContent) => [...prevContent, item]);
    setTabValue(tabContent.length); // Focus on the new tab
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Tabs */}
      <Tabs
        value={tabValue}
        onChange={(event, newValue) => setTabValue(newValue)}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
      >
        {tabContent.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>

      {/* Tab Content */}
      <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc" }}>
        {tabContent.length > 0 && tabContent[tabValue] && (
          <div>
            <h3>{tabContent[tabValue].label}</h3>
            {tabContent[tabValue].path && (
              <p>Path: {tabContent[tabValue].path}</p>
            )}
          </div>
        )}
      </Box>
    </Box>
  );
}