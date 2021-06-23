import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  phone:null,
  isAuthenticated: false,
  token: '',
  registrationToken: '',
  is_profile_completed: false,
  isStaff: false,
  user: null,
  responseMessage:''
};

const userAuthSlice = createSlice({
  name: 'auth',
  initialState,
  phoneToken:'',
  reducers: {
    userPhoneNumber (state,{payload}) {
      state.phone = payload
    },
    successMessage (state,{payload}) {
      state.responseMessage = payload
    },
    phoneRequestStart() {},
    phoneRequestSuccess() {},
    phoneRequestFailure() {},

    changeOldPhoneRequestStart() {},
    changeOldPhoneRequestSuccess() {},
    changeOldPhoneRequestFailure() {},

    oldPhoneRequestStart() {},
    oldPhoneRequestSuccess() {},
    oldPhoneRequestFailure() {},

    conformCodeRequestStart() {},
    conformCodeRequestSuccess(state,{payload}) {
      state.is_profile_completed = payload.is_profile_completed
      state.token = payload.token
    },
    conformCodeRequestFailure(payload) {
      console.log(payload)
    },

    newPhoneConformCodeRequestStart() {},
    newPhoneCodeRequestSuccess(state,{payload}) {
      state.is_profile_completed = payload.is_profile_completed
      state.token = payload.token
    },
    newPhoneCodeRequestFailure(payload) {
      console.log(payload)
    },

    oldPhoneConformCodeRequestStart() {},
    oldPhoneCodeRequestSuccess(state,{payload}) {
      state.is_profile_completed = payload.is_profile_completed
      state.token = payload.token
    },
    oldPhoneCodeRequestFailure(payload) {
      console.log(payload)
    },

    registrationRequestStart() {},
    registrationRequestSuccess(state,{payload}) {
      state.is_profile_completed = payload.is_profile_completed
      state.registrationToken = payload.registrationToken
    },
    registrationRequestFailure(payload) {},

    favoriteRequestStart() {},
    favoriteRequestSuccess() {},
    favoriteRequestFailure() {},


    followRequestStart() {},
    followRequestSuccess() {},
    followRequestFailure() {},

    searchRequestStart() {},
    searchRequestSuccess() {},
    searchRequestFailure() {},

    logoutRequestStart() {},
    logoutRequestSuccess(state) {
      state.isAuthenticated = false;
      state.isStaff = false;
      state.user = null;
    },
    logoutRequestFailure() {},

    getStateRequestStart() {},
    getStateRequestSuccess(state, { payload }) {
      state.isAuthenticated = payload.is_authenticated;
      state.isStaff = payload.is_staff;
      state.user = payload.user;
      state.userBalance = payload.user.garbage_point.balance;
    },
    getStateRequestFailure() {},
  },
});

export const { actions } = userAuthSlice;

export default userAuthSlice.reducer;
