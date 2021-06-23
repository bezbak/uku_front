import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  category:[]

};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    categoryRequestStart() {},
    categoryRequestSuccess(state,{payload}) {
      state.category = payload
    },
    categoryRequestFailure() {},

  },
});

export const { actions } = categorySlice;

export default categorySlice.reducer;
