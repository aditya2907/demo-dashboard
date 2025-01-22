import React, { useState } from 'react';
import DrawerPanel from './DrawerPanel';
import MainContent from './MainContent';

const App = () => {
  const [tabs, setTabs] = useState([]);

  const handleOpenTab = (tabName) => {
    if (!tabs.includes(tabName)) {
      setTabs((prevTabs) => [...prevTabs, tabName]);
    }
  };

  const handleCloseTab = (index) => {
    setTabs((prevTabs) => prevTabs.filter((_, i) => i !== index));
  };

  const nestedData = [
    {
      label: 'Dashboard 1',
      children: [
        { label: 'Sub-Dashboard 1.1' },
        { label: 'Sub-Dashboard 1.2' },
      ],
    },
    {
      label: 'Dashboard 2',
      children: [{ label: 'Sub-Dashboard 2.1' }],
    },
    { label: 'Dashboard 3' },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <DrawerPanel data={nestedData} onOpenTab={handleOpenTab} />
      <MainContent tabs={tabs} onCloseTab={handleCloseTab} />
    </div>
  );
};

export default App;