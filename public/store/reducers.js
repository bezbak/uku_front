import { combineReducers } from 'redux';
import mainReducer from '../store/main/slice';
import authReducer from '../store/users/slice';
// import extraReducer from '@store/extra/slice';
// import repaymentReducer from '@store/billing/repayment/slice';
// import moneyTransferReducer from '@store/billing/moneyTransfer/slice';
// import providerReducer from '@store/users/provider/slice';
// import changeHistoryReducer from '@store/extra/changeHistory/slice';
// import snackbarReducer from '@store/snackbar/slice';
// import repaymentMethodReducer from '@store/billing/repaymentMethod/slice';

const rootReducer = combineReducers({
  main: mainReducer,
  auth: authReducer,
  // extra: extraReducer,
  // repayment: repaymentReducer,
  // provider: providerReducer,
  // moneyTransfer: moneyTransferReducer,
  // changeHistory: changeHistoryReducer,
  // snackbar: snackbarReducer,
  // repaymentMethod: repaymentMethodReducer,
});

export default rootReducer;
