import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTab: 0, // Default selected tab
};

const verticalTabSlice = createSlice({
  name: 'verticalTab',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = verticalTabSlice.actions;
export default verticalTabSlice.reducer;