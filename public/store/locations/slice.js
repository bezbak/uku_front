import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
 location:[]

};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    locationRequestStart() {},
    locationRequestSuccess(state,{payload}) {
      state.location = payload
    },
    locationRequestFailure() {},

  },
});

export const { actions } = locationSlice;

export default locationSlice.reducer;
