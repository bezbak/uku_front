import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  accountProfile: {},
  publicationCount:null,
  accountPublicationList: {},
  searchedAccountsList: null,
  subscribe: true,
  id: null
};

const accountProfileSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {

    searchAccountRequestStart() {
    },

    searchAccountRequestSuccess(state, {payload}) {
      state.searchedAccountsList = payload
    },
    searchAccountRequestFailure() {
    },

    accountProfileRequestStart() {
    },
    accountProfileRequestSuccess(state, {payload}) {
      state.id = payload.id
      state.accountProfile = payload
    },
    accountProfileRequestFailure() {
    },


    accountPublicationsRequestStart() {
    },
    accountPublicationsRequestSuccess(state, {payload}) {
      state.accountPublicationList = payload,
        state.publicationCount=payload.count
    },
    accountPublicationsRequestFailure() {
    },

    accountFollowRequestStart() {
    },
    accountFollowRequestSuccess(state, {payload}) {
      state.subscribe = payload.subscribe
      state.id = payload.id
    },
    accountFollowRequestFailure() {
    },

  },
});

export const {actions} = accountProfileSlice;

export default accountProfileSlice.reducer;
