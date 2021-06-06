import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contact:{},
  faq:[],
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
    faqInfoRequestSuccess(state, {payload}) {
      state.faq = payload
    },
    faqInfoRequestFailure() {},

    privacyPolicyRequestStart() {},
    privacyPolicyRequestSuccess() {},
    privacyPolicyRequestFailure() {},

  },
});

export const { actions } = systemSlice;

export default systemSlice.reducer;
