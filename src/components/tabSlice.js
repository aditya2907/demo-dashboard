import { createSlice } from "@reduxjs/toolkit";

const tabsSlice = createSlice({
  name: "tabs",
  initialState: {
    activeTab: null,
    tabs: [],
  },
  reducers: {
    addTab: (state, action) => {
      const newTab = {
        id: `${action.payload}-${Date.now()}`, // Unique ID using timestamp
        label: action.payload,
        content: `Content for ${action.payload}`,
      };
      state.tabs.push(newTab);
      state.activeTab = newTab.id; // Set the new tab as active
    },
    removeTab: (state, action) => {
      state.tabs = state.tabs.filter((tab) => tab.id !== action.payload);
      if (state.tabs.length > 0) {
        state.activeTab = state.tabs[state.tabs.length - 1].id; // Set last tab active
      } else {
        state.activeTab = null;
      }
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { addTab, removeTab, setActiveTab } = tabsSlice.actions;
export default tabsSlice.reducer;