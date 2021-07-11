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
    phoneRequestStart(){
    },
    phoneRequestSuccess() {
    },
    phoneRequestFailure() {
    },

    changeOldPhoneRequestStart() {
    },
    changeOldPhoneRequestSuccess(state, {payload}) {
    },
    changeOldPhoneRequestFailure() {
    },

    oldPhoneRequestStart() {
    },
    oldPhoneRequestSuccess() {
    },
    oldPhoneRequestFailure() {
    },

    conformCodeRequestStart(state, {payload}) {
    },
    conformCodeRequestSuccess(state, {payload}) {
      state.is_profile_completed = payload.is_profile_completed
      state.token = payload.token,
        state.user_region_detail = payload.region_detail
    },
    conformCodeRequestFailure(payload) {
    },

    newPhoneConformCodeRequestStart() {
    },
    newPhoneCodeRequestSuccess(state, {payload}) {
    },
    newPhoneCodeRequestFailure(payload) {
    },

    sendSmsToOldPhoneRequestStart(state, {payload}) {
    },
    sendSmsToOldPhoneRequestSuccess(state,{payload}) {

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
