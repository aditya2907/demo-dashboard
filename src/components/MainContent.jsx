import React, { useState } from 'react';
import { Box, Tabs, Tab, Button } from '@mui/material';

const TabPanel = ({ value, index, children }) => {
  return (
    <div hidden={value !== index} style={{ padding: 16 }}>
      {value === index && children}
    </div>
  );
};

const MainContent = ({ tabs, onCloseTab }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        sx={{ borderBottom: 1, borderColor: 'divider' }}
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabs.map((tab, index) => (
          <Tab
            key={tab.id}
            label={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {tab.name}
                <Button
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseTab(index);
                  }}
                  style={{ marginLeft: 8 }}
                >
                  x
                </Button>
              </div>
            }
          />
        ))}
      </Tabs>
      {tabs.map((tab, index) => (
        <TabPanel key={tab.id} value={activeTab} index={index}>
          <h3>{tab.name}</h3>
          <p>{tab.content}</p>
        </TabPanel>
      ))}
    </Box>
  );
};

export default MainContent;