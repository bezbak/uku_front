import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
 locations:[]

};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    locationRequestStart() {},
    locationRequestSuccess(state,{payload}) {
      state.locations = payload
    },
    locationRequestFailure() {},

  },
});

export const { actions } = locationSlice;

export default locationSlice.reducer;
