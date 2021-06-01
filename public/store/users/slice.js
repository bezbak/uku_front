import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  phone:null,
  isAuthenticated: false,
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
    conformCodeRequestSuccess() {},
    conformCodeRequestFailure() {},

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
