import { put, takeEvery } from 'redux-saga/effects';

import { actions as userAuthActions } from '../../store/users/slice';
// import { actions as extraActions } from '@store/extra/slice';
import { actions } from './slice';

function* loadDifferentData() {
  yield put(userAuthActions.getStateRequestStart());
  // yield put(extraActions.getChoiceFieldsRequestStart());
}

export default function* mainSagas() {
  yield takeEvery(`${actions.loadDifferentData}`, loadDifferentData);
}
