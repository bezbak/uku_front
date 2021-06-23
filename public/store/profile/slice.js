import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 userProfile:{},
  feed:{},
  userAvatar:'',
  publication:{}
};

const userProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {

    successMessage (state,{payload}) {
      state.responseMessage = payload
    },

    profileRequestStart() {},
    profileRequestSuccess(state,{payload}) {
      state.profile = payload
    },
    profileRequestFailure() {},

    updateProfileRequestStart() {},
    updateProfileRequestSuccess(state,{payload}) {
      state.profile = payload
    },
    updateProfileRequestFailure() {},

    feedRequestStart() {},
    feedRequestSuccess(state,{payload}) {
      state.feed = payload
    },
    feedRequestFailure() {},

    publicationRequestStart() {},
    publicationRequestSuccess(state,{payload}) {
      state.publication = payload
    },
    publicationRequestFailure() {},



    avatarGetRequestStart() {},
    avatarGetRequestSuccess(state,{payload}) {
      state.userAvatar = payload
    },
    avatarGetRequestFailure() {},

    updateAvatarGetRequestStart() {},
    updateAvatarGetRequestSuccess(state,{payload}) {
      state.userAvatar = payload
    },
    updateAvatarGetRequestFailure() {},
  },
});

export const { actions } = userProfileSlice;

export default userProfileSlice.reducer;
