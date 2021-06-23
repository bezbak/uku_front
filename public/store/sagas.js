import { all, fork } from 'redux-saga/effects';
import authSagas from '../store/users/sagas';
import userProfileSagas from '../store/profile/sagas';
import locationSagas from '../store/locations/sagas';
import mainSagas from '../store/main/sagas';
// import extraSagas from '@store/extra/sagas';
import categorySagas from '../store/category/sagas';
import publicationSagas from '../store/publication/sagas';
import systemSagas from '../store/system/sagas';

const sagas = [
  mainSagas,
  locationSagas,
  userProfileSagas,
  categorySagas,
  publicationSagas,
  // extraSagas,
  authSagas,
  systemSagas

];

export default function* rootSaga(services = {}) {
  yield all(sagas.map((saga) => fork(saga, services)));
}
