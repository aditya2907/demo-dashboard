import React, { useState } from "react";
import {
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
import { NavLink } from "react-router-dom";

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
            {level === maxDepth - 2 ? ( // Handle the most inner level
              <ListItemButton
                onClick={() => onOpenTab(item)} // Trigger tab opening with item data
              >
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
                onOpenTab={onOpenTab} // Pass the callback down to inner components
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

  // Callback to handle tab opening
  const handleOpenTab = (item) => {
    setTabContent((prevContent) => [...prevContent, item]);
    setTabValue(tabContent.length); // Automatically focus on the new tab
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
      {/* Nested List */}
      <NestedList
        data={nestedData}
        maxDepth={5}
        onOpenTab={handleOpenTab} // Pass the callback
      />

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