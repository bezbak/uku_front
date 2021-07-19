import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accountProfile:{},
  accountPublicationList:{},
  searchedAccountsList :[],
  subscribe:true,
  id:null
};

const accountProfileSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {

    searchAccountRequestStart () {},
    searchAccountRequestSuccess (state,{payload}) {
      state.searchedAccountsList = payload
    },
    searchAccountRequestFailure () {},

    accountProfileRequestStart() {},
    accountProfileRequestSuccess(state,{payload}) {
      state.accountProfile = payload
    },
    accountProfileRequestFailure() {},


    accountPublicationsRequestStart() {},
    accountPublicationsRequestSuccess(state,{payload}) {
      state.accountPublicationList = payload
    },
    accountPublicationsRequestFailure() {},

    accountFollowRequestStart () {},
    accountFollowRequestSuccess (state,{payload}) {
      state.subscribe = payload.subscribe
      state.id = payload.id
      console.log(payload)
    },
    accountFollowRequestFailure () {},

  },
});

export const { actions } = accountProfileSlice;

export default accountProfileSlice.reducer;
