import React from 'react';
import { Drawer } from '@mui/material';
import NestedList from './NestedList';

const DrawerPanel = ({ data, onOpenTab }) => {
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
      <NestedList data={data} onOpenTab={onOpenTab} />
    </Drawer>
  );
};

export default DrawerPanel;