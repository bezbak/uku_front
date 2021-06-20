import { combineReducers } from 'redux';
import mainReducer from '../store/main/slice';
import authReducer from '../store/users/slice';
import systemReducer from '../store/system/slice';
import locationSlice from '../store/locations/slice';
// import extraReducer from '@store/extra/slice';

const rootReducer = combineReducers({
  main: mainReducer,
  auth: authReducer,
  system:systemReducer,
  location:locationSlice,
  // extra: extraReducer,
});

export default rootReducer;
