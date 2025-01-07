import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
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
                {/* Folder Icon with Open/Close State */}
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

export default function App() {
  const [tabValue, setTabValue] = useState(0);
  const [tabContent, setTabContent] = useState([]);

  const nestedData = [
    {
      label: "Item 1",
      children: [
        {
          label: "Item 1.1",
          children: [
            {
              label: "Item 1.1.1",
              children: [
                {
                  label: "Item 1.1.1.1",
                  children: [
                    { label: "Item 1.1.1.1.1", path: "/item-1.1.1.1.1" },
                    { label: "Item 1.1.1.1.2", path: "/item-1.1.1.1.2" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: "Item 2",
      children: [{ label: "Item 2.1", path: "/item-2.1" }],
    },
  ];

  // Callback to handle opening a tab
  const handleOpenTab = (item) => {
    setTabContent((prevContent) => [...prevContent, item]);
    setTabValue(tabContent.length); // Automatically focus on the new tab
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Drawer for Nested List */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
        }}
      >
        <Box sx={{ overflow: "auto" }}>
          <NestedList
            data={nestedData}
            maxDepth={5}
            onOpenTab={handleOpenTab} // Pass callback to open tabs
          />
        </Box>
      </Drawer>

      {/* Main Content Area for Tabs */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
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
    </Box>
  );
}