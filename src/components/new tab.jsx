import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Tabs, Tab, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MainContent = forwardRef((props, ref) => {
  const [tabValue, setTabValue] = useState(0);
  const [tabContent, setTabContent] = useState([]);

  // Method to add a new tab (accessible via ref)
  const handleAddTab = (item) => {
    setTabContent((prevContent) => [...prevContent, item]);
    setTabValue(tabContent.length); // Focus on the new tab
  };

  // Method to remove a tab
  const handleRemoveTab = (index) => {
    const updatedTabs = tabContent.filter((_, i) => i !== index);
    setTabContent(updatedTabs);
    // Update selected tab to prevent out-of-bound errors
    if (index === tabValue) {
      setTabValue(index > 0 ? index - 1 : 0);
    }
  };

  // Expose methods via ref to parent component
  useImperativeHandle(ref, () => ({
    handleAddTab,
  }));

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
          <Tab
            key={index}
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {tab.label}
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent tab switch on close
                    handleRemoveTab(index);
                  }}
                  sx={{ marginLeft: 1 }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            }
          />
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
});

export default MainContent;