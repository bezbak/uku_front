import { combineReducers } from 'redux';
import toastReducer from './toast/slice';
import mainReducer from './main/slice';
import authReducer from './users/slice';
import userReducer from './profile/slice';
import accountReducer from './account/slice';
import userFavorites from './favorites/slice';
import categoryReducer from './category/slice';
import publicationReducer from './publication/slice';
import systemReducer from './system/slice';
import locationSlice from './locations/slice';

const rootReducer = combineReducers({
  toast:toastReducer,
  main: mainReducer,
  auth: authReducer,
  profile: userReducer,
  favorites:userFavorites,
  publication:publicationReducer,
  category:categoryReducer,
  system:systemReducer,
  location:locationSlice,
  account:accountReducer,
});

export default rootReducer;
