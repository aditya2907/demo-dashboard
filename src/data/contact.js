import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer, Tabs, Tab, Box } from '@mui/material';
import NestedList from './NestedList';
import { setActiveTab } from './features/verticalTabSlice';

const DrawerPanel = ({ reports, onOpenTab }) => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.verticalTab.activeTab); // Get active tab from Redux

  const handleTabChange = (event, newValue) => {
    dispatch(setActiveTab(newValue)); // Update active tab in Redux
  };

  const tabData = [
    { label: 'Dashboards', component: <NestedList data={reports} onOpenTab={onOpenTab} /> },
    { label: 'Settings', component: <p>Settings Content</p> },
    { label: 'About', component: <p>About Content</p> },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 300,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 300, boxSizing: 'border-box' },
      }}
    >
      <Box sx={{ display: 'flex', height: '100%' }}>
        {/* Vertical Tabs */}
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            borderRight: 1,
            borderColor: 'divider',
            minWidth: 100,
          }}
        >
          {tabData.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>

        {/* Content for Each Tab */}
        <Box sx={{ flexGrow: 1, padding: 2 }}>
          {tabData.map((tab, index) => (
            <div key={index} hidden={activeTab !== index}>
              {tab.component}
            </div>
          ))}
        </Box>
      </Box>
    </Drawer>
  );
};

export default DrawerPanel;