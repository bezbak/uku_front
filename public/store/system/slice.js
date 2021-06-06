import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contact:{}
};

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    contactInfoRequestStart() {},
    contactInfoRequestSuccess(state, {payload}) {
      state.contact = payload
    },
    contactInfoRequestFailure() {},

    faqInfoRequestStart() {},
    faqInfoRequestSuccess() {},
    faqInfoRequestFailure() {},

    privacyPolicyRequestStart() {},
    privacyPolicyRequestSuccess() {},
    privacyPolicyRequestFailure() {},

  },
});

export const { actions } = systemSlice;

export default systemSlice.reducer;
