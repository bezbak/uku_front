import { put, takeEvery } from 'redux-saga/effects';
import { actions as userAuthActions } from '../users/slice';
import { actions } from './slice';

function* loadDifferentData() {
  yield put(userAuthActions.getStateRequestStart());
}

export default function* mainSagas() {
  yield takeEvery(`${actions.loadDifferentData}`, loadDifferentData);
}
