import { combineReducers } from 'redux';
import toast from './toast/slice';
import main from './main/slice';
import auth from './users/slice';
import profile from './profile/slice';
import account from './account/slice';
import favorites from './favorites/slice';
import category from './category/slice';
import publication from './publication/slice';
import system from './system/slice';
import location from './locations/slice';

const rootReducer = combineReducers({
  toast,
  main,
  auth,
  profile,
  favorites,
  publication,
  category,
  system,
  location,
  account,
});

export default rootReducer;
