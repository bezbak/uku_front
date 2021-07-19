import {put, call, takeEvery} from 'redux-saga/effects';
import api from '../../lib/api';
import {actions} from './slice';


function* userAllFavoritePublicationsRequest({payload}) {
  const {page,callback}=payload;
  try {
    const response = yield call(api.get, 'account/favorite/', {qs:{page:page}});
    yield put(actions.userAllFavoritePublicationsRequestSuccess(response));
    yield call(callback);
  } catch (e) {
    yield put(actions.userAllFavoritePublicationsRequestFailure(e));
  }
}

function* userFavoritePublicationRequest({id}) {
  try {
    const response = yield call(api.get, `/account/favorite/${id}`);
    yield put(actions.userFavoritePublicationRequestSuccess(response));
  } catch (e) {
    yield put(actions.userFavoritePublicationRequestFailure(e));
  }
}


export default function* userFavoriteSagas() {
  yield takeEvery(`${actions.userAllFavoritePublicationsRequestStart}`, userAllFavoritePublicationsRequest);
  yield takeEvery(`${actions.userFavoritePublicationRequestStart}`, userFavoritePublicationRequest);
}
