import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  categoryPublication: {},
  userPublication: {}
};

const publicationSlice = createSlice({
  name: 'publication',
  initialState,
  reducers: {

    categoryPublicationRequestStart() {
    },
    categoryPublicationRequestSuccess(state, {payload}) {
      state.categoryPublication = payload
    },
    categoryPublicationRequestFailure() {
    },

    userPublicationRequestStart() {
    },
    userPublicationRequestSuccess(state, {payload}) {
      state.userPublication = payload
    },
    userPublicationRequestFailure() {
    },

    userCreatePublicationRequestStart() {
    },
    userCreatePublicationRequestSuccess() {
    },
    userCreatePublicationRequestFailure() {
    },


  },
});

export const {actions} = publicationSlice;

export default publicationSlice.reducer;
