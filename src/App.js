import React, { useState } from 'react';
import DrawerPanel from './DrawerPanel';
import MainContent from './MainContent';

const App = () => {
  const reportsData = [
    { id: 'report1', name: 'Sales Report', content: 'Content for Sales Report' },
    { id: 'report2', name: 'Inventory Report', content: 'Content for Inventory Report' },
    { id: 'report3', name: 'Customer Report', content: 'Content for Customer Report' },
  ];

  const [tabs, setTabs] = useState([]);

  const handleOpenReport = (report) => {
    // Prevent duplicate tabs
    if (!tabs.some((tab) => tab.id === report.id)) {
      setTabs((prevTabs) => [...prevTabs, report]);
    }
  };

  const handleCloseTab = (index) => {
    setTabs((prevTabs) => prevTabs.filter((_, i) => i !== index));
  };

  return (
    <div style={{ display: 'flex' }}>
      <DrawerPanel reports={reportsData} onOpenReport={handleOpenReport} />
      <MainContent tabs={tabs} onCloseTab={handleCloseTab} />
    </div>
  );
};

export default App;