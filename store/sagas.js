import { all, fork } from 'redux-saga/effects';
import authSagas from './users/sagas';
import userProfileSagas from './profile/sagas';
import userFavoriteSagas from './favorites/sagas';
import locationSagas from './locations/sagas';
import mainSagas from './main/sagas';
import categorySagas from './category/sagas';
import publicationSagas from './publication/sagas';
import systemSagas from './system/sagas';

const sagas = [
  mainSagas,
  locationSagas,
  userProfileSagas,
  categorySagas,
  publicationSagas,
  authSagas,
  userFavoriteSagas,
  systemSagas

];

export default function* rootSaga(services = {}) {
  yield all(sagas.map((saga) => fork(saga, services)));
}
