import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemButton, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore, Folder, FolderOpen } from '@mui/icons-material';
import { toggleCollapse } from './features/collapseSlice';

const NestedList = ({ data, level = 0, onOpenTab }) => {
  const dispatch = useDispatch();
  const collapseState = useSelector((state) => state.collapse);

  const handleToggle = (key, item) => {
    if (item.children) {
      dispatch(toggleCollapse(key)); // Toggle the collapse state in Redux
    } else if (onOpenTab) {
      onOpenTab(item.label); // Handle opening a tab for items without children
    }
  };

  return (
    <List>
      {data.map((item, index) => {
        const key = `${level}-${index}`; // Generate a unique key for each item
        const isOpen = collapseState[key]; // Get the collapse state for this item

        return (
          <div key={key}>
            <ListItem disablePadding sx={{ pl: level * 2 }}>
              <ListItemButton onClick={() => handleToggle(key, item)}>
                {item.children ? (
                  isOpen ? <FolderOpen sx={{ marginRight: 1 }} /> : <Folder sx={{ marginRight: 1 }} />
                ) : (
                  <Folder sx={{ marginRight: 1, opacity: 0.6 }} />
                )}
                <ListItemText primary={item.label} />
                {item.children && (isOpen ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </ListItem>
            {item.children && (
              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <NestedList data={item.children} level={level + 1} onOpenTab={onOpenTab} />
              </Collapse>
            )}
          </div>
        );
      })}
    </List>
  );
};

export default NestedList;