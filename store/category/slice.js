import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  category:[],
  categoryPublications: {},

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


    categoryPublicationsRequestStart() {
    },
    categoryPublicationsRequestSuccess(state, {payload}) {
      state.categoryPublications = payload
    },
    categoryPublicationsRequestFailure() {
    },


  },
});

export const { actions } = categorySlice;

export default categorySlice.reducer;
