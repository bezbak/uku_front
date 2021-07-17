import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isChangeOldPhone: "phone",
  phone: null,
  isAuthenticated: false,
  is_profile_completed: false,
  region_detail: {},
  isStaff: false,
  user: null,
  user_region_detail: null,
  responseMessage: ''
};

const userAuthSlice = createSlice({
  name: 'auth',
  initialState,
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

    sendAgainPhoneRequestStart() {
    },
    changeOldPhoneRequestStart() {
    },
    changeOldPhoneRequestSuccess(state, {payload}) {
    },
    changeOldPhoneRequestFailure() {
    },
    conformCodeRequestStart(state, {payload}) {
    },
    conformCodeRequestSuccess(state, {payload}) {
      state.is_profile_completed = payload.is_profile_completed
      state.user_region_detail = payload.region_detail
    },
    conformCodeRequestFailure(payload) {
    },

    newPhoneConformCodeRequestStart() {
    },
    newPhoneCodeRequestSuccess(state, {payload}) {
    },
    newPhoneCodeRequestFailure() {
    },

    sendSmsToOldPhoneRequestStart() {
    },
    sendSmsToOldPhoneRequestSuccess(state, {payload}) {

    },
    sendSmsToOldPhoneRequestFailure() {
    },

    oldPhoneConformCodeRequestStart(state, {payload}) {
    },
    oldPhoneCodeRequestSuccess(state, {payload}) {
    },
    oldPhoneCodeRequestFailure(payload) {
    },

    registrationRequestStart(state, {payload}) {
    },
    registrationRequestSuccess(state, {payload}) {
      state.user_region_detail = payload.region_detail
    },
    registrationRequestFailure(payload) {
    },

    favoriteRequestStart(state, {payload}) {
    },
    favoriteRequestSuccess(state, {payload}) {
    },
    favoriteRequestFailure() {
    },


    followRequestStart(state, {payload}) {
    },
    followRequestSuccess(state, {payload}) {
    },
    followRequestFailure() {
    },

    searchRequestStart(state, {payload}) {
    },
    searchRequestSuccess(state, {payload}) {
    },
    searchRequestFailure() {
    },

    logoutRequestStart(state) {
      state.isAuthenticated = false;
      state.is_profile_completed = false;
      state.user = null;
    },

  },
});

export const {actions} = userAuthSlice;

export default userAuthSlice.reducer;
