import React, { useState } from "react";
import {
  Box,
  Tab,
  Tabs,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function FullScreenTabs() {
  const [tabs, setTabs] = useState([{ id: 1, label: "Tab 1", content: "Content 1" }]);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const addTab = () => {
    const newId = tabs.length + 1;
    setTabs((prevTabs) => [
      ...prevTabs,
      { id: newId, label: `Tab ${newId}`, content: `Content ${newId}` },
    ]);
    setValue(tabs.length); // Switch to the new tab
  };

  const removeTab = (index) => {
    setTabs((prevTabs) => prevTabs.filter((_, i) => i !== index));
    setValue((prevValue) => (index === prevValue ? 0 : prevValue - 1));
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ backgroundColor: "#f5f5f5", borderBottom: "1px solid #ccc" }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={tab.id}
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {tab.label}
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTab(index);
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            }
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        {tabs.map((tab, index) => (
          <TabPanel key={tab.id} value={value} index={index}>
            <Typography variant="h6">{tab.content}</Typography>
          </TabPanel>
        ))}
      </Box>
      <Button
        variant="contained"
        onClick={addTab}
        sx={{ margin: 2, alignSelf: "flex-start" }}
      >
        Add Tab
      </Button>
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default FullScreenTabs;