import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore, Folder, FolderOpen } from "@mui/icons-material";

const NestedList = ({ data, level = 0, maxDepth = 5, onOpenTab }) => {
  const [open, setOpen] = useState({});

  const handleClick = (index) => {
    setOpen((prevOpen) => ({ ...prevOpen, [index]: !prevOpen[index] }));
  };

  return (
    <List>
      {data.map((item, index) => (
        <div key={index}>
          <ListItem disablePadding sx={{ pl: level * 2 }}>
            {level === maxDepth - 2 ? (
              // Handle inner-most level to open a tab
              <ListItemButton onClick={() => onOpenTab(item)}>
                <Folder sx={{ marginRight: 1 }} />
                <ListItemText primary={item.label} />
              </ListItemButton>
            ) : (
              <ListItemButton onClick={() => handleClick(index)}>
                {item.children ? (
                  open[index] ? (
                    <FolderOpen sx={{ marginRight: 1 }} />
                  ) : (
                    <Folder sx={{ marginRight: 1 }} />
                  )
                ) : (
                  <Folder sx={{ marginRight: 1, opacity: 0.6 }} />
                )}
                <ListItemText primary={item.label} />
                {item.children && (
                  open[index] ? <ExpandLess /> : <ExpandMore />
                )}
              </ListItemButton>
            )}
          </ListItem>
          {item.children && (
            <Collapse in={open[index]} timeout="auto" unmountOnExit>
              <NestedList
                data={item.children}
                level={level + 1}
                maxDepth={maxDepth}
                onOpenTab={onOpenTab}
              />
            </Collapse>
          )}
        </div>
      ))}
    </List>
  );
};

export default function DrawerPanel({ data, onOpenTab }) {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
      }}
    >
      <NestedList data={data} maxDepth={5} onOpenTab={onOpenTab} />
    </Drawer>
  );
}