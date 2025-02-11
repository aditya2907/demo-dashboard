import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tabs, Tab, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { removeTab, setActiveTab } from "./features/tabsSlice";

const MainContent = () => {
  const { tabs, activeTab } = useSelector((state) => state.tabs);
  const dispatch = useDispatch();

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      {/* Tabs List */}
      <Tabs
        value={activeTab}
        onChange={(e, newValue) => dispatch(setActiveTab(newValue))}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            value={tab.id}
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {tab.label}
                <IconButton size="small" onClick={(e) => {
                  e.stopPropagation();
                  dispatch(removeTab(tab.id));
                }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            }
          />
        ))}
      </Tabs>

      {/* Tab Content */}
      <Box sx={{ padding: 2 }}>
        {tabs.find((tab) => tab.id === activeTab)?.content || "No tab selected"}
      </Box>
    </Box>
  );
};

export default MainContent;