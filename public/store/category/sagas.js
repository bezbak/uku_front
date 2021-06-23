import {put, call, takeEvery} from 'redux-saga/effects';
import api from '../../lib/api';
import {parseSubmissionError} from '../../lib/utils/store/sagas';
import {actions} from './slice';

function* categoryRequest() {
  try {
    const response = yield call(api.get, 'category/');
    yield put(actions.categoryRequestSuccess(response));
  } catch (e) {
    yield put(actions.categoryRequestFailure(e));
  }
}

export default function* categorySagas() {
  yield takeEvery(`${actions.categoryRequestStart}`, categoryRequest);
}
