import { combineReducers } from 'redux';
import toastReducer from './toast/slice';
import mainReducer from './main/slice';
import authReducer from './users/slice';
import userReducer from './profile/slice';
import categoryReducer from './category/slice';
import publicationReducer from './publication/slice';
import systemReducer from './system/slice';
import locationSlice from './locations/slice';
// import extraReducer from '@store/extra/slice';

const rootReducer = combineReducers({
  toast:toastReducer,
  main: mainReducer,
  auth: authReducer,
  profile: userReducer,
  publication:publicationReducer,
  category:categoryReducer,
  system:systemReducer,
  location:locationSlice,
  // extra: extraReducer,
});

export default rootReducer;
