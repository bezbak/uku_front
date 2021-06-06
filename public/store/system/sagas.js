import {put, call, takeEvery} from 'redux-saga/effects';
import api from '../../lib/api';
import {parseSubmissionError} from '../../lib/utils/store/sagas';
import {actions} from './slice';
import isEmpty from "lodash/isEmpty";



function* contactRequest() {
  try {
    const response = yield call(api.get, 'system/contact/');
    yield put(actions.contactInfoRequestSuccess(response));
    console.log(response)
  } catch (e) {
    console.log(e)
    yield put(actions.conformCodeRequestFailure(e));
  }
}

function* conformCodeRequest({payload}) {
  const {values, callback} = payload;
  console.log(values)
  try {
    const response = yield call(api.post, 'account/login-confirm/', { data: values });
    yield put(actions.conformCodeRequestSuccess(response));
    console.log(response)
    yield call(callback);
    console.log("try")
  } catch (e) {
    console.log(e)
    yield put(actions.conformCodeRequestFailure(e));
    yield call(callback, parseSubmissionError(e));
  }

}

function* logoutRequest({payload}) {
  const {callback} = payload;
  try {
    yield call(api.post, 'account/logout/');
    yield put(actions.logoutRequestSuccess());
    yield call(callback);
  } catch (e) {
    yield put(actions.logoutRequestFailure(e));
  }
}

function* getStateRequest() {
  try {
    const response = yield call(api.get, 'account/get_state/');
    yield put(actions.getStateRequestSuccess(response));
  } catch (e) {
    yield put(actions.getStateRequestFailure(e));
  }
}

export default function* systemSagas() {
  yield takeEvery(`${actions.contactInfoRequestStart}`, contactRequest);
  yield takeEvery(`${actions.faqInfoRequestStart}`, conformCodeRequest);
  yield takeEvery(`${actions.privacyPolicyRequestStart}`, logoutRequest);
}
