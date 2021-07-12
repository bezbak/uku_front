import {put, call, takeEvery} from 'redux-saga/effects';
import api from '../../lib/api';
import {actions} from './slice';



function* locationRequest() {
  try {
    const response = yield call(api.get, 'location/');
    yield put(actions.locationRequestSuccess(response));
  } catch (e) {
    yield put(actions.locationRequestFailure(e));
  }
}

export default function* locationSagas() {
  yield takeEvery(`${actions.locationRequestStart}`, locationRequest);
}
