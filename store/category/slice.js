import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  category:[],
  pageCount:null,
  categoryPublications1: [],
  categoryPublications2: [],
  categoryPublications: [],
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
      state.pageCount =  payload.count
    },
    categoryPublicationsRequestFailure() {
    },


  },
});

export const { actions } = categorySlice;

export default categorySlice.reducer;
