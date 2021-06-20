import { all, fork } from 'redux-saga/effects';
import locationSagas from '../store/locations/sagas';
import mainSagas from '../store/main/sagas';
// import extraSagas from '@store/extra/sagas';
import authSagas from '../store/users/sagas';
import systemSagas from '../store/system/sagas';

const sagas = [
  mainSagas,
  locationSagas,
  // extraSagas,
  authSagas,
  systemSagas

];

export default function* rootSaga(services = {}) {
  yield all(sagas.map((saga) => fork(saga, services)));
}
