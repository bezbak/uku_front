import {put, call, takeEvery} from 'redux-saga/effects';
import api from '../../lib/api';
import {actions} from './slice';


function* userAllFavoriteRequest() {
  try {
    const response = yield call(api.get, 'account/favorite/');
    yield put(actions.userAllFavoriteRequestSuccess(response));
  } catch (e) {
    yield put(actions.userFavoriteRequestFailure(e));
  }
}

function* userFavoriteAccountRequest({id}) {
  try {
    const response = yield call(api.get, `/account/favorite/${id}`);
    yield put(actions.userFavoriteAccountRequestSuccess(response));
  } catch (e) {
    yield put(actions.userAllFavoriteAccountRequestFailure(e));
  }
}


export default function* userFavoriteSagas() {
  yield takeEvery(`${actions.userAllFavoriteRequestStart}`, userAllFavoriteRequest);
  yield takeEvery(`${actions.userFavoriteAccountRequestStart}`, userFavoriteAccountRequest);
}
