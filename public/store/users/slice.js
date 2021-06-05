import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  phone:null,
  isAuthenticated: false,
  token: '',
  is_profile_completed: false,
  isStaff: false,
  user: null,
  userBalance: '',
};

const userAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userPhoneNumber (state,{payload}) {
      state.phone = payload
    },
    phoneRequestStart() {},
    phoneRequestSuccess() {},
    phoneRequestFailure() {},

    conformCodeRequestStart() {},
    conformCodeRequestSuccess(state,{payload}) {
      state.is_profile_completed = payload.is_profile_completed
      state.token = payload.token
    },
    conformCodeRequestFailure(payload) {
      console.log(payload)
    },

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
