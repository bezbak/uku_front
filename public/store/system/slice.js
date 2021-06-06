import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contact: {},
  faq: [],
  privacyPolicy: {},
  termsOfUse: {},
};

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    contactInfoRequestStart() {},
    contactInfoRequestSuccess(state, {payload}) {
      state.contact = payload
    },
    contactInfoRequestFailure() {
    },

    faqInfoRequestStart() {
    },
    faqInfoRequestSuccess(state, {payload}) {
      state.faq = payload
    },
    faqInfoRequestFailure() {
    },

    privacyPolicyRequestStart() {
    },
    privacyPolicyRequestSuccess(state, {payload}) {
      state.privacyPolicy = payload
    },
    privacyPolicyRequestFailure() {
    },

    termsOfUseRequestStart() {
    },
    termsOfUseRequestSuccess(state, {payload}) {
      state.termsOfUse = payload
    },
    termsOfUseRequestFailure() {
    },

  },
});

export const { actions } = systemSlice;

export default systemSlice.reducer;
