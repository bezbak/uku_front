import {put, call, takeEvery} from 'redux-saga/effects';
import api from '../../lib/api';
import {parseSubmissionError} from '../../lib/utils/store/sagas';
import {actions} from './slice';
import isEmpty from "lodash/isEmpty";



function* contactRequest() {
  try {
    const response = yield call(api.get, 'system/contact/');
    yield put(actions.contactInfoRequestSuccess(response));
  } catch (e) {
    yield put(actions.conformCodeRequestFailure(e));
  }
}

function* faqRequest() {
  try {
    const response = yield call(api.get, 'system/faq/');
    yield put(actions.faqInfoRequestSuccess(response));
    console.log(response)
  } catch (e) {
    console.log(e)
    yield put(actions.faqInfoRequestFailure(e));
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
  yield takeEvery(`${actions.faqInfoRequestStart}`, faqRequest);
  yield takeEvery(`${actions.privacyPolicyRequestStart}`, logoutRequest);
}
