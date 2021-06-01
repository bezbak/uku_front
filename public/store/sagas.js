import { all, fork } from 'redux-saga/effects';
import mainSagas from '../store/main/sagas';
// import extraSagas from '@store/extra/sagas';
import authSagas from '../store/users/sagas';
// import repaymentSagas from '@store/billing/repayment/sagas';
// import moneyTransferSagas from '@store/billing/moneyTransfer/sagas';
// import providerSagas from '@store/users/provider/sagas';
// import changeHistorySagas from '@store/extra/changeHistory/sagas';
// import repaymentMethodSagas from '@store/billing/repaymentMethod/sagas';

const sagas = [
  mainSagas,
  // extraSagas,
  authSagas,
  // repaymentSagas,
  // providerSagas,
  // moneyTransferSagas,
  // changeHistorySagas,
  // repaymentMethodSagas,
];

export default function* rootSaga(services = {}) {
  yield all(sagas.map((saga) => fork(saga, services)));
}
