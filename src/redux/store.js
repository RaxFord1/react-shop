// store.js
import { configureStore } from '@reduxjs/toolkit';
import shoppingReducer from './shoppingSlice';

export default configureStore({
  reducer: {
    shopping: shoppingReducer,
  },
});