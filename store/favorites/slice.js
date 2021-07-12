import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allFavorites:{},
  favorite:{},
};

const userFavorites = createSlice({
  name: 'favorite',
  initialState,
  reducers: {

    userAllFavoriteRequestStart() {},
    userAllFavoriteRequestSuccess(state,{payload}) {
      state.allFavorites = payload
    },
    userFavoriteRequestFailure() {},

    userFavoriteAccountRequestStart() {},
    userFavoriteAccountRequestSuccess(state,{payload}) {
      state.favorite = payload
    },
    userAllFavoriteAccountRequestFailure() {},


  },
});

export const { actions } = userFavorites;

export default userFavorites.reducer;
