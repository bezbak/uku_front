import {createSlice} from '@reduxjs/toolkit';
import Cookies from "js-cookie";

const initialState = {
  publication_id:null,
  publicationInfo:{},
  searchedPublicationList:{},
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

    setPublicationId (state, {payload}) {
      state.publication_id=payload;
      Cookies.set("PublicationId", payload);
    },

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
      state.searchedPublicationList = payload
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
