import React from "react";
import DrawerPanel from "./components/DrawerPanel";
import MainContent from "./components/MainContent";
import { Box } from "@mui/material";

const App = () => {
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

  const mainContentRef = React.useRef();

  // Function to pass data to MainContent
  const handleOpenTab = (item) => {
    if (mainContentRef.current) {
      mainContentRef.current.handleAddTab(item);
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Drawer Panel */}
      <DrawerPanel data={nestedData} onOpenTab={handleOpenTab} />

      {/* Main Content */}
      <MainContent ref={mainContentRef} />
    </Box>
  );
};

export default App;