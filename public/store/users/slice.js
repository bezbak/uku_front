import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isChangeOldPhone: "phone",
  phone: null,
  isAuthenticated: false,
  is_profile_completed: false,
  token: '',
  region_detail: {},
  isStaff: false,
  user: null,
  user_region_detail: null,
  responseMessage: ''
};

const userAuthSlice = createSlice({
  name: 'auth',
  initialState,
  phoneToken: '',
  reducers: {
    changePhoneTitle(state, {payload}) {
      state.isChangeOldPhone = payload
    },
    userPhoneNumber(state, {payload}) {
      state.phone = payload
    },
    successMessage(state, {payload}) {
      state.responseMessage = payload
    },
    phoneRequestStart() {
    },
    phoneRequestSuccess() {
    },
    phoneRequestFailure() {
    },

    changeOldPhoneRequestStart() {
    },
    changeOldPhoneRequestSuccess() {
    },
    changeOldPhoneRequestFailure() {
    },

    oldPhoneRequestStart() {
    },
    oldPhoneRequestSuccess() {
    },
    oldPhoneRequestFailure() {
    },

    conformCodeRequestStart() {
    },
    conformCodeRequestSuccess(state, {payload}) {
      state.is_profile_completed = payload.is_profile_completed
      state.token = payload.token,
        state.user_region_detail = payload.region_detail
    },
    conformCodeRequestFailure(payload) {
      console.log(payload)
    },

    newPhoneConformCodeRequestStart() {
    },
    newPhoneCodeRequestSuccess(state, {payload}) {
      state.is_profile_completed = payload.is_profile_completed
      state.token = payload.token
    },
    newPhoneCodeRequestFailure(payload) {
      console.log(payload)
    },

    oldPhoneConformCodeRequestStart() {
    },
    oldPhoneCodeRequestSuccess() {
    },
    oldPhoneCodeRequestFailure(payload) {
      console.log(payload)
    },

    registrationRequestStart() {
    },
    registrationRequestSuccess(state, {payload}) {
      // state.is_profile_completed = payload.is_profile_completed,
      state.user_region_detail = payload.region_detail
    },
    registrationRequestFailure(payload) {
    },

    favoriteRequestStart() {
    },
    favoriteRequestSuccess() {
    },
    favoriteRequestFailure() {
    },


    followRequestStart() {
    },
    followRequestSuccess() {
    },
    followRequestFailure() {
    },

    searchRequestStart() {
    },
    searchRequestSuccess() {
    },
    searchRequestFailure() {
    },

    logoutRequestStart() {
    },
    logoutRequestSuccess(state) {
      state.isAuthenticated = false;
      state.isStaff = false;
      state.user = null;
    },
    logoutRequestFailure() {
    },

    getStateRequestStart() {
    },
    getStateRequestSuccess(state, {payload}) {
      state.isAuthenticated = payload.is_authenticated;
      state.isStaff = payload.is_staff;
      state.user = payload.user;
      state.userBalance = payload.user.garbage_point.balance;
    },
    getStateRequestFailure() {
    },
  },
});

export const {actions} = userAuthSlice;

export default userAuthSlice.reducer;
