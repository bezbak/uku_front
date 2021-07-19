import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allFavoritePublications:{},
  favoritePublication:{},
};

const userFavorites = createSlice({
  name: 'favorite',
  initialState,
  reducers: {

    userAllFavoritePublicationsRequestStart() {},
    userAllFavoritePublicationsRequestSuccess(state,{payload}) {
      state.allFavoritePublications = payload
    },
    userAllFavoritePublicationsRequestFailure() {},

    userFavoritePublicationRequestStart() {},
    userFavoritePublicationRequestSuccess(state,{payload}) {
      state.favoritePublication = payload
    },
    userFavoritePublicationRequestFailure() {},


  },
});

export const { actions } = userFavorites;

export default userFavorites.reducer;
