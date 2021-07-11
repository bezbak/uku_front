import { createSlice } from '@reduxjs/toolkit';

export const initialState = {};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    loadDifferentData() {},
  },
});

export const { actions } = mainSlice;

export default mainSlice.reducer;
