import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  publicationInfo:{},
  searchedPublicationInfo:{},
  publicationDescription:{},
  userPublication: {},
  publicationCommentList:{},
  publicationComment:{},
  publicationReply:{},
};

const publicationSlice = createSlice({
  name: 'publication',
  initialState,
  reducers: {

    uploadPublicationImageRequestStart () {},
    uploadPublicationImageRequestSuccess (state, {payload}) {
    },
    uploadPublicationImageRequestFailure () {},

    createPublicationRequestStart () {},
    createPublicationRequestSuccess (state, {payload}) {
    },
    createPublicationRequestFailure () {},

    getPublicationInfoRequestStart () {},
    getPublicationInfoRequestSuccess (state, {payload}) {
      state.publicationInfo = payload
    },
    getPublicationInfoRequestFailure () {},

    updatePublicationRequestStart () {},
    updatePublicationRequestSuccess (state,{payload}) {
      state.publicationDescription=payload;
    },
    updatePublicationRequestFailure () {},

    deletePublicationRequestStart () {},
    deletePublicationRequestSuccess () {},
    deletePublicationRequestFailure () {},

    deletePublicationImageRequestStart () {},
    deletePublicationImageRequestSuccess () {},
    deletePublicationImageRequestFailure () {},

    searchPublicationRequestStart () {},
    searchPublicationRequestSuccess(state, {payload}) {
      state.searchedPublicationInfo = payload
    },
    searchPublicationRequestFailure () {},

    // userPublicationRequestStart() {},
    // userPublicationRequestSuccess(state, {payload}) {
    //   state.userPublication = payload
    // },
    // userPublicationRequestFailure() {},

    commentsPublicationRequestStart() {},
    commentsPublicationRequestSuccess(state, {payload}) {
      state.publicationCommentList = payload
    },
    commentsPublicationRequestFailure() {},

    addCommentPublicationRequestStart() {},
    addCommentPublicationRequestSuccess(state, {payload}) {
      state.publicationComment=payload;
    },
    addCommentPublicationRequestFailure() {},

    replyCommentPublicationRequestStart() {},
    replyCommentPublicationRequestSuccess(state, {payload}) {
      state.publicationReply=payload;
    },
    replyCommentPublicationRequestFailure() {},

  },
});

export const {actions} = publicationSlice;

export default publicationSlice.reducer;
