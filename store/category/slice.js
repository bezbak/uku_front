import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  category:[],
  categoryPublications: {},
  category_id: null

};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategoryId(state,{payload}) {
      state.category_id = payload
    },
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
