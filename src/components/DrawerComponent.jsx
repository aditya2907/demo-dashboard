import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

const DrawerPanel = ({ reports, onOpenReport }) => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <List>
        {reports.map((report) => (
          <ListItem key={report.id} disablePadding>
            <ListItemButton onClick={() => onOpenReport(report)}>
              <ListItemText primary={report.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default DrawerPanel;