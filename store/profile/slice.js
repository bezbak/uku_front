import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userProfile:{},
  feed:{},
  count:null,
  feedPublication:[],
  userAvatar:'',
  userPublications:{}
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
      state.userProfile = payload
    },
    profileRequestFailure() {},

    updateProfileRequestStart() {},
    updateProfileRequestSuccess(state,{payload}) {
      state.profile = payload
    },
    updateProfileRequestFailure() {},

    feedRequestStart() {},
    feedRequestSuccess: (state,{payload})=> {
      state.feed = payload,
      state.count = payload.count,
      state.feedPublication = state.feedPublication.concat( payload.results);
    },
    feedRequestFailure() {},

    updateFeed(state,{payload}){
      state.feedPublication = payload;
    },

    publicationRequestStart() {},
    publicationRequestSuccess(state,{payload}) {
      state.userPublications = payload
    },
    publicationRequestFailure() {},

    deletePublicationRequestStart() {},
    deletePublicationRequestSuccess(state,{payload}) {
      state.userPublications = payload
    },
    deletePublicationRequestFailure() {},



    avatarGetRequestStart() {},
    avatarGetRequestSuccess(state,{payload}) {
      state.userAvatar = payload
    },
    avatarGetRequestFailure() {},

    updateAvatarRequestStart() {},
    updateAvatarRequestSuccess(state,{payload}) {
      state.userAvatar = payload
    },
    updateAvatarRequestFailure() {},
  },
});

export const { actions } = userProfileSlice;

export default userProfileSlice.reducer;
