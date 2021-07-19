import {put, call, takeEvery} from 'redux-saga/effects';
import api from '../../lib/api';
import {actions} from './slice';

function* categoryRequest() {
  try {
    const response = yield call(api.get, 'category/');
    yield put(actions.categoryRequestSuccess(response));
  } catch (e) {
    yield put(actions.categoryRequestFailure(e));
  }
}


function* categoryPublicationsRequest({payload}) {
  const {id, callback} = payload;
  try {
    const response = yield call(api.get, `publication/category/${id}`);
    yield put(actions.categoryPublicationsRequestSuccess(response));
    yield call(callback);
  } catch (e) {
    yield put(actions.categoryPublicationsRequestFailure(e));
  }
}



export default function* categorySagas() {
  yield takeEvery(`${actions.categoryRequestStart}`, categoryRequest);
  yield takeEvery(`${actions.categoryPublicationsRequestStart}`, categoryPublicationsRequest);
}
