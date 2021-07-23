import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
 locations:[],
  location_id: null

};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocationId(state,{payload}) {
      state.location_id = payload
    },
    locationRequestStart() {},
    locationRequestSuccess(state,{payload}) {
      state.locations = payload
    },
    locationRequestFailure() {},

  },
});

export const { actions } = locationSlice;

export default locationSlice.reducer;
