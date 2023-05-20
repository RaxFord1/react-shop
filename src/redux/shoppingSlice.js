// shoppingSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const shoppingSlice = createSlice({
  name: 'shopping',
  initialState: {
    items: [],
    filteredItems: [],
    filter: "",
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      state.filteredItems.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item !== action.payload);
      state.filteredItems = state.filteredItems.filter(item => item !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      state.filteredItems = state.items.filter(item => item.includes(action.payload));
    },
    resetFilter: state => {
      state.filter = "";
      state.filteredItems = [...state.items];
    },
  },
});

export const { addItem, removeItem, setFilter, resetFilter } = shoppingSlice.actions;
export default shoppingSlice.reducer;